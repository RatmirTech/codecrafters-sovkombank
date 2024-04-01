using System.Text.Json.Serialization;

namespace CurrencyOrders.Api.DTO
{
    public class NotificationCreateDto
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
    }
}
