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
        private readonly IRotaService _rotaService;
        private readonly IPosicaoRepository _posicaoRepository;

        public PosicaoService(IAuthService authService, IPosicaoRepository posicaoRepository, IRotaService rotaService)
        {
            _authService = authService;
            _posicaoRepository = posicaoRepository;
            _rotaService = rotaService;
        }

        public async Task<DataResponse<bool>> SetPosicao(PosicaoRequest posicaoRequest)
        {
            var currentUser = await _authService.GetCurrentUser();
            if (currentUser.Discriminator == "ColetorUser")
            {
                try
                {
                    var posisaoExists = await _posicaoRepository.GetByUserIdAsync(currentUser.Id); 
                    if (posisaoExists == null)
                    {
                        var posicao = new Posicao(posicaoRequest, currentUser);
                        _ = await _posicaoRepository.CreateAsync(posicao);
                    }
                    else
                    {
                        posisaoExists.Longitude = posicaoRequest.Longitude;
                        posisaoExists.Latitude = posicaoRequest.Latitude;
                        _ = await _posicaoRepository.UpdateAsync(posisaoExists);
                    }
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
                    var rota = await _rotaService.GetRotaAtiva(posicao.User.Id);
                    if (rota != null) { 
                        listPosicaoDto.Add(new PosicaoDto(posicao, rota.DataFim)); 
                    };
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
