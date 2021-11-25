namespace UpSkill.Services.Hubs
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.SignalR;
    using UpSkill.Data.Common.Repositories;
    using UpSkill.Data.Models;
    using UpSkill.Web.ViewModels.Chat;

    public class ChatHub : Hub
    {
        private readonly string bot;
        private const string room = "devs";

        private readonly IRepository<Message> messages;

        private readonly IDictionary<string, UserConnection> connections;

        public ChatHub(
            IDictionary<string, UserConnection> connections,
            IRepository<Message> messages)
        {
            this.connections = connections;
            this.messages = messages;
            this.bot = "Chat Bot";
        }

        public async Task JoinRoom(UserConnection userConnection)
        {
            await this.Groups
                .AddToGroupAsync(this.Context.ConnectionId, room);

            this.connections[this.Context.ConnectionId] = userConnection;

            await this.Clients
                .Group(room)
                .SendAsync("ReceiveMessage", this.bot, $"{userConnection.Name} has joined the {room} room!", DateTime.UtcNow.ToString(), userConnection.Name);
        }

        public async Task Send(string message, string user)
        {
            if (this.connections.TryGetValue(this.Context.ConnectionId, out UserConnection userConnection))
            {
                var currentTime = DateTime.UtcNow;
                var messageDb = new Message()
                {
                    OwnerName = userConnection.Name,
                    Text = message,
                    Time = currentTime.ToString(),
                };

                await this.messages.AddAsync(messageDb);
                await this.messages.SaveChangesAsync();

                await this.Clients.Group(room)
                    .SendAsync("ReceiveMessage", userConnection.Name, message, currentTime.ToString("H:mm"), user);
            }
        }

        public async Task<ICollection<MessageViewModel>> GetLastMessages()
        {
            var last = this.messages
                    .AllAsNoTracking()
                    .OrderByDescending(m => m.Time)
                    .Take(10)
                    .Select(m => new MessageViewModel
                    {
                        Name = m.OwnerName,
                        Message = m.Text,
                        CurrentTime = m.Time,
                    });

            return await Task.Run(() => last.ToList());
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            if (this.connections.TryGetValue(this.Context.ConnectionId, out UserConnection userConnection))
            {
                this.connections.Remove(this.Context.ConnectionId);

                await this.Clients.Group(room)
                       .SendAsync("ReceiveMessage", this.bot, $"{userConnection.Name} has left!", DateTime.UtcNow.ToString(), this.bot);
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}
