namespace CurrencyOrders.Api.DTOs
{
    /// <summary>
    /// Представляет данные для отображения информации о заявке без идентификаторов.
    /// </summary>
    public class OrderDto
    {
        /// <summary>
        /// Дата создания заявки.
        /// </summary>
        /// <value>
        /// Дата и время создания заявки.
        /// </value>
        public DateTime OrderDate { get; set; }

        /// <summary>
        /// Тип заявки: Продажа / Покупка.
        /// </summary>
        /// <value>
        /// Тип заявки.
        /// </value>
        public string OrderType { get; set; }

        /// <summary>
        /// Код валюты, из которой осуществляется перевод.
        /// </summary>
        /// <value>
        /// Код валюты (например, RUB, AED, CNY).
        /// </value>
        public string CurrencyFrom { get; set; }

        /// <summary>
        /// Количество денежных средств, которые переводятся.
        /// </summary>
        /// <value>
        /// Сумма в валюте отправления.
        /// </value>
        public decimal CurrencyFromValue { get; set; }

        /// <summary>
        /// Номер счета, с которого снимаются деньги.
        /// </summary>
        /// <value>
        /// Номер банковского счета отправителя.
        /// </value>
        public string BankAccountFrom { get; set; }

        /// <summary>
        /// Код валюты, в которую осуществляется перевод.
        /// </summary>
        /// <value>
        /// Код валюты (например, RUB, AED, CNY).
        /// </value>
        public string CurrencyTo { get; set; }

        /// <summary>
        /// Количество денежных средств, которые зачисляются на счет получателя.
        /// </summary>
        /// <value>
        /// Сумма в валюте получения после конвертации.
        /// </value>
        public decimal CurrencyToValue { get; set; }

        /// <summary>
        /// Текущий статус заявки.
        /// </summary>
        /// <value>
        /// Статус заявки (например, "На рассмотрении", "Одобрено").
        /// </value>
        public string Status { get; set; }

        /// <summary>
        /// Курс валюты, по которому производится конвертация.
        /// </summary>
        /// <value>
        /// Текущий курс конвертации.
        /// </value>
        public decimal CurrencyRate { get; set; }

        /// <summary>
        /// Номер счета, на который зачисляются деньги.
        /// </summary>
        /// <value>
        /// Номер банковского счета получателя.
        /// </value>
        public string BankAccountTo { get; set; }
    }
}
