using CurrencyOrders.Api.DTO;

namespace CurrencyOrders.Api.Abstractions
{
    /// <summary>
    /// Interface of central bank service
    /// </summary>
    public interface ICentralBankService
    {
        ///<inheritdoc/>
        /// <summary>
        /// Accepts the currency order asynchronous.
        /// </summary>
        /// <param name="orderId">The order identifier.</param>
        /// <param name="dto">dto</param>
        /// <returns></returns>
        Task AcceptCurrencyOrderAsync(Guid orderId, TransferMoneyDto dto);
    }
}
