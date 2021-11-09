namespace UpSkill.Web.Hubs
{
    using System;
    using System.Collections.Generic;
	using System.Security.Claims;
	using System.Threading.Tasks;
	using Microsoft.AspNetCore.Http;
	using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.SignalR;
    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Web.ViewModels.Chat;

    public class ChatHub : Hub
    {
        private readonly string bot;


        private readonly IRepository<UserInCourse> usersInCourses;
        private readonly IRepository<Message> messages;
        private readonly UserManager<ApplicationUser> userManager;

        private readonly IDictionary<string, UserConnection> connections;

        public ChatHub(
            IDictionary<string, UserConnection> connections,
            IRepository<UserInCourse> usersInCourses,
            IRepository<Message> messages,
            UserManager<ApplicationUser> userManager)
        {
            this.connections = connections;
            this.messages = messages;
            this.usersInCourses = usersInCourses;
            this.userManager = userManager;


            this.bot = "Chat Bot";
        }



        public async Task JoinRoom(UserConnection userConnection)
        {
            await this.Groups
                .AddToGroupAsync(this.Context.ConnectionId, userConnection.Room);

            this.connections[this.Context.ConnectionId] = userConnection;

            await this.Clients
                .Group(userConnection.Room)
                .SendAsync("ReceiveMessage", this.bot, $"{userConnection.User} has joined the {userConnection.Room} room!");
        }

        public async Task Send(string message)
        {
            if (this.connections.TryGetValue(this.Context.ConnectionId, out UserConnection userConnection))
            {
                await this.Clients.Group(userConnection.Room)
                    .SendAsync("ReceiveMessage", userConnection.User, message);
            }
        }


        public override async Task OnDisconnectedAsync(Exception exception)
        {
            if (this.connections.TryGetValue(this.Context.ConnectionId, out UserConnection userConnection))
            {
                this.connections.Remove(this.Context.ConnectionId);

                await this.Clients.Group(userConnection.Room)
                       .SendAsync("ReceiveMessage", this.bot, $"{userConnection.User} has left!");
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}
