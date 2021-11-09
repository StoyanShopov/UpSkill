namespace UpSkill.Data.Models
{
    using System;

    public class Message
    {
        public string Id { get; init; } = Guid.NewGuid().ToString();

        public string Text { get; set; }

        public string Time { get; set; }

        //public string GroupChatId { get; init; }

        public string OwnerName { get; init; }
    }
}
