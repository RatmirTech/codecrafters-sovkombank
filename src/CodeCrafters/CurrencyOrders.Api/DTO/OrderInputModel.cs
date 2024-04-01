namespace CurrencyOrders.Api.DTOs
{
    /// <summary>
    /// Входные данные для заявки
    /// </summary>
    public class OrderInputModel
    {
        /// <summary>
        /// Gets or sets the user identifier.
        /// </summary>
        /// <value>
        /// The user identifier.
        /// </value>
        public Guid UserId { get; set; }

        /// <summary>
        /// Тип заявки: Продажа / Покупка
        /// </summary>
        /// <value>
        /// Продажа / Покупка
        /// </value>
        public string OrderType { get; set; } = string.Empty;

        /// <summary>
        /// Код валюты из которой переводим 
        /// </summary>
        /// <value>
        /// RUB AED CNY
        /// </value>
        public string CurrencyFrom { get; set; } = string.Empty;

        /// <summary>
        /// Кол-во денег которые переводим
        /// </summary>
        /// <value>
        /// 1000.00
        /// </value>
        public decimal CurrencyFromValue { get; set; }

        /// <summary>
        /// Номер счёта с которого снимаем деньги
        /// </summary>
        /// <value>
        /// 3123218321321378217378127312 (где то 19 символов)
        /// </value>
        public string BankAccountFrom { get; set; } = string.Empty;

        /// <summary>
        /// Код валюты в которую переводим 
        /// </summary>
        /// <value>
        /// RUB AED CNY
        /// </value>
        public string CurrencyTo { get; set; } = string.Empty;

        /// <summary>
        /// Номер счёта на который зачисляем деньги
        /// </summary>
        /// <value>
        /// 3123218321321378217378127312 (где то 19 символов)
        /// </value>
        public string BankAccountTo { get; set; } = string.Empty;
    }
}
