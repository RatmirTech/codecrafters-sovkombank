namespace CurrencyOrders.Api.Abstractions
{
    /// <summary>
    /// Interface of CurrencyRateService
    /// </summary>
    public interface ICurrencyRateService
    {
        /// <inheritdoc/>
        /// <summary>
        /// Gets the currency rate.
        /// </summary>
        /// <param name="currenyFrom">The curreny from.</param>
        /// <param name="currenyTo">The curreny to.</param>
        /// <returns>currency rate</returns>
        Task<decimal> GetCurrencyRate(string currenyFrom, string currenyTo);
    }
}
