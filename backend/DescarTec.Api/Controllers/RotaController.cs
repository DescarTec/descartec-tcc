using DescarTec.Api.Core.Interfaces.Service;
using DescarTec.Api.Models.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DescarTec.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RotaController : ControllerBase
    {
        private readonly IRotaService _rotaService;

        public RotaController(IRotaService rotaService)
        {
            _rotaService = rotaService;
        }

        [Authorize(Roles = "Coletor")]
        [HttpPost("iniciar-rota")]
        public async Task<ActionResult> IniciarRota([FromBody] RotaRequest rotaRequest)
        {
            try
            {
                var result = await _rotaService.IniciarRota(rotaRequest);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
