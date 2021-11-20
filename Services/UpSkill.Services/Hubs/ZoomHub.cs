namespace UpSkill.Services.Hubs
{
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.SignalR;
    using Microsoft.EntityFrameworkCore;

    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Web.ViewModels.Zoom;

    public class ZoomHub : Hub
    {
        private const string SystemLog = "SYSTEM";

        private readonly IDictionary<string, ZoomCourseConnection> connections;
        private readonly IRepository<UserInCourse> userInCourses;

        public ZoomHub(
            IDictionary<string, ZoomCourseConnection> connections,
            IRepository<UserInCourse> userInCourses)
        {
            this.connections = connections;
            this.userInCourses = userInCourses;
        }

        public async Task<List<int>> JoinCourses()
        {
            var token = this.Context.GetHttpContext().Request.Query["token"][0];
            if (token is null)
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();

            var decryptedToken = tokenHandler.ReadJwtToken(token);
            var id = decryptedToken.Claims.FirstOrDefault(claim => claim.Type == "nameid").Value;
            var name = decryptedToken.Claims.FirstOrDefault(claim => claim.Type == "unique_name").Value;

            var zoomConnection = new ZoomCourseConnection
            {
                Id = id,
                Name = name,
            };

            var allCourses = await this.userInCourses
                .AllAsNoTracking()
                .Where(uc => uc.ApplicationUserId == id)
                .Select(uc => uc.CourseId)
                .ToListAsync();

            this.connections[this.Context.ConnectionId] = zoomConnection;

            foreach (var courseId in allCourses)
            {
                await this.Groups
                .AddToGroupAsync(this.Context.ConnectionId, courseId.ToString());
            }

            return allCourses;
        }

        public async Task SendJoinMessage(string courseId)
        {
            if (this.connections.TryGetValue(this.Context.ConnectionId, out ZoomCourseConnection zoomConnection))
            {
                var currentTime = DateTime.UtcNow;

                var logInMessage = $"{zoomConnection.Name} has joined {courseId} course room!";

                await this.Clients.Group(courseId)
                    .SendAsync("ReceiveMessage", SystemLog, logInMessage);
            }
        }

        public string GetUserConnection()
        {
            if (this.connections.TryGetValue(this.Context.ConnectionId, out ZoomCourseConnection zoomConnection))
            {
                var con = this.Context.ConnectionId;
                return this.Context.ConnectionId;
            }

            return null;
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            if (this.connections.TryGetValue(this.Context.ConnectionId, out ZoomCourseConnection zoomConnection))
            {
                this.connections.Remove(this.Context.ConnectionId);
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}
