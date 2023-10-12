using DescarTec.Api.Core.Interfaces.Service;
using DescarTec.Api.Models.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace DescarTec.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]

    public class PosicaoController : ControllerBase
    {
        private readonly IPosicaoService _posicaoService;

        public PosicaoController(IPosicaoService posicaoService)
        {
            _posicaoService = posicaoService;
        }

        [Authorize(Roles = "Coletor")]
        [HttpPost("set-posicao")]
        public async Task<ActionResult> SetPosicao([FromBody] PosicaoRequest posicao)
        {
            try
            {
                var result = await _posicaoService.SetPosicao(posicao);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpGet("listar-posicoes-coletores")]
        public async Task<ActionResult> ListPosicoesColetores()
        {
            try
            {
                var result = await _posicaoService.ListPosicoesColetores();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
