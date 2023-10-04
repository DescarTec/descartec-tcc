using DescarTec.Api.Models.Dto;
using DescarTec.Api.Models.Meta;
using DescarTec.Api.Models.Request;
using DescarTec.Api.Models.Response;

namespace DescarTec.Api.Core.Interfaces.Service
{
    public interface IPosicaoService
    {
        Task<ListResponse<PosicaoDto, PosicaoMeta>> ListPosicoesColetores();
        Task<DataResponse<bool>> SetPosicao(PosicaoRequest posicaoRequest);
    }
}