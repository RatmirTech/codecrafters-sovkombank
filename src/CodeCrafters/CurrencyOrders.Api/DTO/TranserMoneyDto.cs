using System.Text.Json.Serialization;

namespace CurrencyOrders.Api.DTO
{
    /// <summary>
    /// Объект передачи данных для перевода денег между банковскими счетами.
    /// </summary>
    public class TransferMoneyDto
    {
        /// <summary>
        /// Идентификатор банковского счета, с которого будут списываться деньги.
        /// </summary>
        [JsonPropertyName("bank_account_from")]
        public string BankAccountFrom { get; set; }

        /// <summary>
        /// Сумма денег для списания.
        /// </summary>
        [JsonPropertyName("money_minus")]
        public decimal MoneyMinus { get; set; }

        /// <summary>
        /// Идентификатор банковского счета, на который будут зачислены деньги.
        /// </summary>
        [JsonPropertyName("bank_account_to")]
        public string BankAccountTo { get; set; }

        /// <summary>
        /// Сумма денег для зачисления.
        /// </summary>
        [JsonPropertyName("money_plus")]
        public decimal MoneyPlus { get; set; }

        /// <summary>
        /// Идентификатор пользователя, инициирующего перевод.
        /// </summary>
        [JsonPropertyName("user_id")]
        public Guid UserId { get; set; }
    }
}
