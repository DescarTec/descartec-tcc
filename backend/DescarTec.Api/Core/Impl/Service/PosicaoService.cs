using DescarTec.Api.Core.Impl.Repository;
using DescarTec.Api.Core.Interfaces.Repository;
using DescarTec.Api.Core.Interfaces.Service;
using DescarTec.Api.Models.Request;
using DescarTec.Api.Models.Response;
using DescarTec.Api.Models;
using DescarTec.Api.Models.Dto;
using DescarTec.Api.Models.Meta;

namespace DescarTec.Api.Core.Impl.Service
{
    public class PosicaoService : IPosicaoService
    {
        private readonly IAuthService _authService;
        private readonly IPosicaoRepository _posicaoRepository;

        public PosicaoService(IAuthService authService, IPosicaoRepository posicaoRepository)
        {
            _authService = authService;
            _posicaoRepository = posicaoRepository;
        }

        public async Task<DataResponse<bool>> SetPosicao(PosicaoRequest posicaoRequest)
        {
            var currentUser = await _authService.GetCurrentUser();
            if (currentUser.Discriminator == "ColetorUser")
            {
                try
                {
                    var posicao = new Posicao(posicaoRequest, currentUser);
                    _ = await _posicaoRepository.InsertOrUpdateAsync(posicao);
                }
                catch (Exception ex)
                {
                    return new DataResponse<bool>(
                        new ErroResponse()
                        {
                            Exception = ex,
                            Message = "Erro ao persistir Posicao no banco de dados."
                        }
                    );
                }
                return new DataResponse<bool>(true);
            }
            else
            {
                return new DataResponse<bool>(
                    new ErroResponse()
                    {
                        Exception = new Exception("Usuario não autorizado"),
                        Message = "Usuario não é Coletor"
                    }
                );
            }
        }
        public async Task<ListResponse<PosicaoDto, PosicaoMeta>> ListPosicoesColetores()
        {
            try
            {
                var result = await _posicaoRepository.ListPosicoesColetores();
                var listPosicaoDto = new List<PosicaoDto>();
                foreach (var posicao in result)
                {
                    listPosicaoDto.Add(new PosicaoDto(posicao));
                }
                return new ListResponse<PosicaoDto, PosicaoMeta>(listPosicaoDto, new());
            }
            catch (Exception ex)
            {
                return new ListResponse<PosicaoDto, PosicaoMeta>(
                    new ErroResponse()
                    {
                        Exception = ex,
                        Message = "Erro ao buscar Posicoes no banco de dados."
                    }
                );
            }
        }
    }
}
