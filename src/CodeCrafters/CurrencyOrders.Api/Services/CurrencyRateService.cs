using CurrencyOrders.Api.Abstractions;
using System.Text.Json;

namespace CurrencyOrders.Api.Services
{
    /// <summary>
    /// CurrencyRateService - service for work with currency rate microservice
    /// </summary>
    /// <seealso cref="CurrencyOrders.Api.Abstractions.ICurrencyRateService" />
    public class CurrencyRateService : ICurrencyRateService
    {
        private readonly HttpClient _httpClient;
        private readonly string _currencyRateBaseUrl;
        private readonly string _notificationUrl;
        private readonly ILogger<CurrencyRateService> _logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="CurrencyRateService"/> class.
        /// </summary>
        /// <param name="httpClient">The HTTP client.</param>
        /// <param name="configuration">The configuration.</param>
        /// <param name="logger">The logger.</param>
        /// <exception cref="System.ArgumentNullException">httpClient</exception>
        public CurrencyRateService(HttpClient httpClient, IConfiguration configuration, ILogger<CurrencyRateService> logger)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _currencyRateBaseUrl = configuration.GetValue<string>("CurrencyRateService:BaseUrl");
            _notificationUrl = configuration.GetValue<string>("Notifications:BaseUrl");
            _logger = logger;
        }

        public async Task<decimal> GetCurrencyRate(string currencyFrom, string currencyTo)
        {
            await _httpClient.GetAsync($"{_currencyRateBaseUrl}/currencies/get-currency-rates?currency={currencyFrom}-{currencyTo}&days=1");

            _logger.LogInformation($"GET currency rate from {currencyFrom} to {currencyTo}");
            currencyFrom = currencyFrom.ToLower();
            currencyTo = currencyTo.ToLower();
            string requestUri = $"{_currencyRateBaseUrl}/currencies/get-currency-rate?currency={currencyFrom}-{currencyTo}";
            _logger.LogInformation(requestUri);
            HttpResponseMessage response = await _httpClient.GetAsync(requestUri);
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();
            _logger.LogWarning(responseBody);

            using (JsonDocument document = JsonDocument.Parse(responseBody))
            {
                if (document.RootElement.GetProperty("ok").GetBoolean() &&
                    document.RootElement.GetProperty("items").GetArrayLength() > 0)
                {
                    decimal rate = document.RootElement.GetProperty("items")[0].GetProperty("rate").GetDecimal();
                    return rate;
                }
                else
                {
                    var err = "Невозможно получить курс валюты или ответ от сервиса не содержит данных.";
                    _logger.LogError(err);
                    throw new InvalidOperationException(err);
                }
            }
        }

        private class CurrencyRateResponse
        {
            public bool Ok { get; set; }
            public List<RateItem> Items { get; set; } = new List<RateItem>();
        }

        private class RateItem
        {
            public decimal Rate { get; set; }
        }
    }
}