namespace UpSkill.Web.Areas.Coach.ZoomAPI
{
    using System;
    using System.Collections.Generic;
    using System.Net;
    using System.Text;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.SignalR;
    using Microsoft.Extensions.Configuration;
    using Microsoft.IdentityModel.Tokens;
    using Newtonsoft.Json.Linq;
    using RestSharp;
    using UpSkill.Services.Data.Contracts.Course;
    using UpSkill.Services.Hubs;
    using UpSkill.Web.ViewModels.Course;

    public class RoomController : CoachBaseController
    {
        private readonly IConfiguration configuration;
        private readonly IHubContext<ZoomHub> hubContext;
        private readonly ICourseService coursesService;

        public RoomController(
            IConfiguration configuration,
            IHubContext<ZoomHub> hubContext,
            ICourseService coursesService)
        {
            this.configuration = configuration;
            this.hubContext = hubContext;
            this.coursesService = coursesService;
        }

        private string ApiKey => this.configuration.GetSection("Zoom").GetSection("ApiKey").Value;

        private string ApiUrl => this.configuration.GetSection("Zoom").GetSection("ZoomApiUrl").Value;

        private string Issuer => this.configuration.GetSection("Zoom").GetSection("Issuer").Value;

        [HttpGet]
        public async Task<string> CreateRoom(string courseId, string user)
        {
            string apiKey = this.configuration.GetSection("Zoom").GetSection("ApiKey").Value;
            string apiUrl = this.configuration.GetSection("Zoom").GetSection("ZoomApiUrl").Value;
            string issuer = this.configuration.GetSection("Zoom").GetSection("Issuer").Value;

            var course = await this.coursesService
                .GetByIdAsync<ZoomViewModel>(int.Parse(courseId));

            var coachId = course.CoachId;
            var coachName = course.CoachFirstName + " " + course.CoachLastName;

            var tokenHandler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
            var now = DateTime.UtcNow;
            var apiSecret = this.ApiKey;
            byte[] symmetricKey = Encoding.ASCII.GetBytes(apiSecret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = this.Issuer,
                Expires = now.AddSeconds(300),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(symmetricKey), SecurityAlgorithms.HmacSha256),
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            var client = new RestClient(this.ApiUrl);
            var request = new RestRequest(Method.POST);
            request.RequestFormat = DataFormat.Json;
            request.AddJsonBody(new { topic = $"Meeting with {coachName}", duration = "30", start_time = "2021-10-29T05:00:00", type = "2" });
            request.AddHeader("authorization", string.Format("Bearer {0}", tokenString));

            IRestResponse restResponse = await client.ExecuteAsync(request);
            HttpStatusCode statusCode = restResponse.StatusCode;
            int numericStatusCode = (int)statusCode;
            var obj = JObject.Parse(restResponse.Content);
            var hostURL = (string)obj["start_url"];
            var joinURL = (string)obj["join_url"];
            var code = Convert.ToString(numericStatusCode);

            this.SummonAllStudents(courseId.ToString(), joinURL, user);

            return hostURL;
        }

        private async void SummonAllStudents(string courseId, string joinUrl, string user)
        {
            var inviteMessage = $"{courseId} course is now live! You can join the broadcast at ";

            await this.hubContext.Clients
                .GroupExcept(courseId, new List<string> { user })
                .SendAsync("receiveInviteMessage", inviteMessage, joinUrl);
        }
    }
}
