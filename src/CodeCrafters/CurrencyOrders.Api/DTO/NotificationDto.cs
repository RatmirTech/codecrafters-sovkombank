using System.Text.Json.Serialization;

namespace CurrencyOrders.Api.DTO
{
    public class NotificationDto
    {
        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("status")]
        public string Status { get; set; }

        [JsonPropertyName("user_id")]
        public Guid UserId { get; set; }

        [JsonPropertyName("is_read")]
        public bool IsRead { get; set; } = false;

        public NotificationDto(Guid userId, string title, string description, string status, bool isRead)
        {
            this.UserId = userId;
            this.Title = title;
            this.Description = description;
            this.Status = status;
            this.IsRead = isRead;
        }
    }
}
