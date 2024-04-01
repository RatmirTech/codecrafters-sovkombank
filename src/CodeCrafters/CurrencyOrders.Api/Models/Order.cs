using System.ComponentModel.DataAnnotations.Schema;

namespace CurrencyOrders.Api.Models
{
    [Table("orders")]
    public class Order
    {
        [Column("id")]
        public Guid Id { get; set; }

        [Column("user_id")]
        public Guid UserId { get; set; }

        [Column("orderdate")]
        public DateTime OrderDate { get; set; }

        [Column("ordertype")]
        public string OrderType { get; set; }

        [Column("currencyfrom")]
        public string CurrencyFrom { get; set; }

        [Column("currencyfromvalue")]
        public decimal CurrencyFromValue { get; set; }

        [Column("bankaccountfrom")]
        public string BankAccountFrom { get; set; }

        [Column("currencyto")]
        public string CurrencyTo { get; set; }

        [Column("currencytovalue")]
        public decimal CurrencyToValue { get; set; }

        [Column("status")]
        public string Status { get; set; }

        [Column("currencyrate")]
        public decimal CurrencyRate { get; set; }

        [Column("bankaccountto")]
        public string BankAccountTo { get; set; }
    }
}
