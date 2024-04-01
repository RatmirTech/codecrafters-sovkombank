using CurrencyOrders.Api.Abstractions;
using CurrencyOrders.Api.Data;
using CurrencyOrders.Api.DTO;
using CurrencyOrders.Api.DTOs;
using CurrencyOrders.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CurrencyOrders.Controllers
{
    /// <summary>
    /// Controller of user's request for currency exchange
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.ControllerBase" />
    [ApiController]
    [Route("[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly ILogger<OrdersController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly ICentralBankService _centralBankService;
        private readonly ICurrencyRateService _currencyRateService;


        /// <summary>
        /// Initializes a new instance of the <see cref="OrdersController"/> class.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <param name="logger">The logger.</param>
        /// <param name="centralBankService">The central bank service.</param>'
        /// <param name="currencyRateService">The currency rate service.</param>
        public OrdersController(ApplicationDbContext context, ILogger<OrdersController> logger,
            ICentralBankService centralBankService, ICurrencyRateService currencyRateService)
        {
            _context = context;
            _logger = logger;
            _centralBankService = centralBankService;
            _currencyRateService = currencyRateService;
        }


        /// <summary>
        /// Get User Currency Order list
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>order list <see cref="OrderDto"/></returns>
        [HttpGet]
        public async Task<List<OrderDto>> Get(Guid userId)
        {
            _logger.LogInformation($"Get request by user {userId}, to get currency orders.");
            var ordersDto = await _context.Orders
                .Where(o => o.UserId == userId)
                .Select(o => new OrderDto
                {
                    OrderDate = o.OrderDate,
                    OrderType = o.OrderType,
                    CurrencyFrom = o.CurrencyFrom,
                    CurrencyFromValue = o.CurrencyFromValue,
                    BankAccountFrom = o.BankAccountFrom,
                    CurrencyTo = o.CurrencyTo,
                    CurrencyToValue = o.CurrencyToValue,
                    Status = o.Status,
                    CurrencyRate = o.CurrencyRate,
                    BankAccountTo = o.BankAccountTo
                })
                .ToListAsync();
            _logger.LogInformation($"Orders count = {ordersDto.Count()}");
            return ordersDto;
        }

        /// <summary>
        /// Posts request to add user currency order.
        /// </summary>
        /// <param name="input">The input.</param>
        /// <returns>message</returns>
        [HttpPost(nameof(NewOrder))]
        public async Task<IActionResult> NewOrder([FromBody] OrderInputModel input)
        {
            _logger.LogInformation($"New currency order by user {input.UserId}");
            decimal rate = await _currencyRateService.GetCurrencyRate(input.CurrencyFrom, input.CurrencyTo);

            if (rate is decimal.Zero)
            {
                _logger.LogError("Ошибка получения курса валют");
                return BadRequest(new { message = "Курс валюты не найден" });
            }

            _logger.LogInformation("Create new order");
            Guid orderId = Guid.NewGuid();
            var order = new Order
            {
                Id = orderId,
                UserId = input.UserId,
                OrderType = input.OrderType,
                CurrencyFrom = input.CurrencyFrom,
                CurrencyFromValue = input.CurrencyFromValue,
                BankAccountFrom = input.BankAccountFrom,
                CurrencyTo = input.CurrencyTo,
                CurrencyToValue = Math.Round(input.CurrencyFromValue * rate, 2, MidpointRounding.AwayFromZero),
                BankAccountTo = input.BankAccountTo,
                Status = "На рассмотрении",
                CurrencyRate = rate,
                OrderDate = DateTime.UtcNow
            };

            _logger.LogInformation($"New order {orderId}, by user {input.UserId}");
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"Order {orderId} created and saved. Waiting for approval.");

            var transferDto = new TransferMoneyDto()
            {
                UserId = order.UserId,
                BankAccountFrom = order.BankAccountFrom,
                BankAccountTo = order.BankAccountTo,
                MoneyMinus = order.CurrencyFromValue,
                MoneyPlus = order.CurrencyToValue
            };

            // Запускаем задачу в фоновом потоке, это очень простая имитация отправки в банк,
            // учитывая что банк через 6 секунд одобрит уже заявку.
            Task.Run(async () => await _centralBankService.AcceptCurrencyOrderAsync(orderId, transferDto))
                .ContinueWith(task =>
                    _logger.LogError(task.Exception, $"Error in ScheduleOrderApprovalAsync for order {orderId}."),
                    TaskContinuationOptions.OnlyOnFaulted);

            return Ok(new { message = "Заявка успешно создана и находится на рассмотрении" });
        }
    }
}
