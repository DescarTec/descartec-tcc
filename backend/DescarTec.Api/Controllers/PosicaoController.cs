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
        //private readonly PosicaoService _posicaoService;

        [HttpPost("SetPosicaoCurrentUser")]
        public async Task<ActionResult> SetPosicaoCurrentUser([FromBody] SetPosicaoRequest posicao)
        {
            try
            {
                //await _posicaoService.SetPosicaoCurrentUser(posicao);

                return Ok(true);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
