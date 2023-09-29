using DescarTec.Api.Core.Interfaces.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace DescarTec.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]
    public class NotificacaoController : ControllerBase
    {
        private readonly INotificacaoService _notificacaoService;

        public NotificacaoController(INotificacaoService notificacaoService)
        {
            _notificacaoService = notificacaoService;
        }

        [Authorize(Roles = "Coletor")]
        [HttpPost("notificar-rota")]
        public async Task<ActionResult> NotificarRota([FromBody] List<string> ceps)
        {
            try
            {
                await _notificacaoService.NotificarRota(ceps);

                return Ok(true);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-notificacoes")]
        public async Task<ActionResult> GetNotificacoes()
        {
            try
            {
                var result = await _notificacaoService.GetNotificacoes();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("ler-notificacoes")]
        public async Task<ActionResult> LerNotificacoes()
        {
            try
            {
                var result = await _notificacaoService.LerNotificacoes();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
