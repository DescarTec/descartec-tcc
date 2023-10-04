using DescarTec.Api.Core.Interfaces.Service;
using DescarTec.Api.Models.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DescarTec.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PosicaoController : ControllerBase
    {
        private readonly IPosicaoService _posicaoService;

        public PosicaoController(IPosicaoService posicaoService)
        {
            _posicaoService = posicaoService;
        }


        [HttpPost("SetPosicao")]
        public async Task<ActionResult> SetPosicao([FromBody] PosicaoRequest posicao)
        {
            try
            {
                await _posicaoService.SetPosicao(posicao);

                return Ok(true);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
