using Microsoft.AspNetCore.Mvc;

namespace CentralBankSystem.Api.Controllers
{

    /// <summary>
    /// Контроллер заглушка для одобрения всех действий от лица банка
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.ControllerBase" />
    [ApiController]
    [Route("[controller]")]
    public class CentralBankController : ControllerBase
    {
        [HttpPost("AcceptRegistration")]
        public bool AcceptRegistration()
        {
            return true;
        }

        [HttpPost("AcceptNewBankAccount")]
        public bool AcceptNewBankAccount()
        {
            return true;
        }

        [HttpPost("AcceptTransaction")]
        public bool AcceptTransaction()
        {
            return true;
        }

        [HttpPost("AcceptCurrencyOrder")]
        public async Task<bool> AcceptCurrencyOrder()
        {
            await Task.Delay(10000);
            return true;
        }
    }
}
