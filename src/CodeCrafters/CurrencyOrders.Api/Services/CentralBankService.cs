using CurrencyOrders.Api.Abstractions;
using CurrencyOrders.Api.Data;
using CurrencyOrders.Api.DTO;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Text.Json;

namespace CurrencyOrders.Api.Services
{
    public class CentralBankService : ICentralBankService
    {
        private readonly ApplicationDbContext _context;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly string _centralBankBaseUrl;
        private readonly string _accountServiceBaseUrl;
        private readonly string _notificationUrl;
        private readonly ILogger<CentralBankService> _logger;
        private readonly IDbContextFactory<ApplicationDbContext> _contextFactory;


        /// <summary>
        /// Initializes a new instance of the <see cref="CentralBankService"/> class.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <param name="httpClientFactory">The HTTP client factory.</param>
        /// <param name="configuration">The configuration.</param>
        public CentralBankService(ApplicationDbContext context, IHttpClientFactory httpClientFactory,
            IConfiguration configuration, ILogger<CentralBankService> logger,
            IDbContextFactory<ApplicationDbContext> dbContextFactory)
        {
            _context = context;
            _httpClientFactory = httpClientFactory;
            _centralBankBaseUrl = configuration.GetValue<string>("CentralBank:BaseUrl");
            _accountServiceBaseUrl = configuration.GetValue<string>("AccountService:BaseUrl");
            _notificationUrl = configuration.GetValue<string>("Notifications:BaseUrl");
            _logger = logger;
            _contextFactory = dbContextFactory;
        }

        public async Task AcceptCurrencyOrderAsync(Guid orderId, TransferMoneyDto dto)
        {
            _logger.LogInformation($"New order {orderId}");
            var httpClient = _httpClientFactory.CreateClient();

            var notification = new NotificationDto(dto.UserId,
                $"Обмен валют", "В системие оформлена новая заявка на обмен валют. Проверьта статус заявки в разделе Мои заявки.", "order", false);
            var notification_json = System.Text.Json.JsonSerializer.Serialize(notification);
            var notification_content = new StringContent(notification_json, System.Text.Encoding.UTF8, "application/json");
            await httpClient.PostAsync($"{_notificationUrl}/notifications/", notification_content);

            var orderData = new { OrderId = orderId };
            var json = System.Text.Json.JsonSerializer.Serialize(orderData);

            var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

            var response = await httpClient.PostAsync($"{_centralBankBaseUrl}/CentralBank/AcceptCurrencyOrder", content);
            _logger.LogInformation($"{response.StatusCode}, {response.Content}");

            if (response.IsSuccessStatusCode)
            {
                _logger.LogInformation($"Bank accepted order {orderId}");
                var contentString = await response.Content.ReadAsStringAsync();
                var result = bool.Parse(contentString);
                if (result)
                {
                    using (var _context = _contextFactory.CreateDbContext())
                    {
                        var order = await _context.Orders.FindAsync(orderId);
                        if (order != null)
                        {
                            order.Status = "Одобрено";
                            _context.Orders.Update(order);
                            await _context.SaveChangesAsync();
                            _logger.LogInformation($"Order {orderId} status changed to Одобрено.");

                            notification = new NotificationDto(dto.UserId,
                            $"Обмен валют", "Ваша заявка на обмен валют одобрена. Проверьта статус заявки в разделе Мои заявки.", "order", false);
                            notification_json = System.Text.Json.JsonSerializer.Serialize(notification);
                            notification_content = new StringContent(notification_json, System.Text.Encoding.UTF8, "application/json");

                            await httpClient.PostAsync($"{_notificationUrl}/notifications/", notification_content);
                            await TransferMoneyByCurrencyOrder(dto);
                        }
                    }
                }
            }
            else
            {
                _logger.LogError($"Error processing order {orderId}: {response.StatusCode}");
            }
        }

        public async Task TransferMoneyByCurrencyOrder(TransferMoneyDto dto)
        {
            _logger.LogInformation(@$"New query to transfer money user {dto.UserId} 
                                    from bank account: {dto.BankAccountFrom}, to {dto.BankAccountTo}");
            var jsonRequest = JsonSerializer.Serialize(dto);
            var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");
            var httpClient = _httpClientFactory.CreateClient();
            var response = await httpClient.PostAsync($"{_accountServiceBaseUrl}/orders/transfer-money", content);

            if (response.IsSuccessStatusCode)
            {
                _logger.LogInformation("Успешный перевод средств.");
            }
            else
            {
                _logger.LogError($"Ошибка при переводе средств. Статус код: {response.StatusCode}");
            }
        }
    }
}
