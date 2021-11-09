namespace UpSkill.Web.Areas.Coach.ZoomAPI
{
    using System;
    using System.Net;
    using System.Text;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using Microsoft.IdentityModel.Tokens;
    using Newtonsoft.Json.Linq;
    using RestSharp;

    public class RoomController : CoachBaseController
    {
        private readonly IConfiguration configuration;

        public RoomController(IConfiguration configuration) => this.configuration = configuration;

        private string ApiKey => this.configuration.GetSection("Zoom").GetSection("ApiKey").Value;

        private string ApiUrl => this.configuration.GetSection("Zoom").GetSection("ZoompiUrl").Value;

        private string Issuer => this.configuration.GetSection("Zoom").GetSection("Issuer").Value;

        [HttpPost]
        public async Task<string> CreateRoom(int courseId)
        {
            string apiKey = this.configuration.GetSection("Zoom").GetSection("ApiKey").Value;
            string apiUrl = this.configuration.GetSection("Zoom").GetSection("ZoomApiUrl").Value;
            string issuer = this.configuration.GetSection("Zoom").GetSection("Issuer").Value;

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
            request.AddJsonBody(new { topic = "Meeting with {Coach Name}", duration = "30", start_time = "2021-10-29T05:00:00", type = "2" });
            request.AddHeader("authorization", String.Format("Bearer {0}", tokenString));

            IRestResponse restResponse = await client.ExecuteAsync(request);
            HttpStatusCode statusCode = restResponse.StatusCode;
            int numericStatusCode = (int)statusCode;
            var jObject = JObject.Parse(restResponse.Content);
            var hostURL = (string)jObject["start_url"];
            var joinURL = (string)jObject["join_url"];
            var code = Convert.ToString(numericStatusCode);

            this.SummonAllStudents(courseId, joinURL);

            return "Host:" + hostURL;
        }

		private void SummonAllStudents(int courseId, string joinUrl)
		{
            //var usersInCourse = getAll(courseId);
        }
    }
}
