using DescarTec.Api.Core.Interfaces.Repository;
using DescarTec.Api.Core.Interfaces.Service;
using DescarTec.Api.Models;
using DescarTec.Api.Models.Request;
using DescarTec.Api.Models.Response;

namespace DescarTec.Api.Core.Impl.Service
{
    public class RotaService : IRotaService
    {
        private readonly IAuthService _authService;
        private readonly INotificacaoService _notificacaoService;
        private readonly IRotaRepository _rotaRepository;

        public RotaService(IAuthService authService, IRotaRepository rotaRepository, INotificacaoService notificacaoService)
        {
            _authService = authService;
            _notificacaoService = notificacaoService;
            _rotaRepository = rotaRepository;
        }

        public async Task<DataResponse<bool>> IniciarRota(RotaRequest rotaRequest)
        {
            var currentUser = await _authService.GetCurrentUser();
            try
            {
                var rota = new Rota(rotaRequest, currentUser);
                var result = await _rotaRepository.CreateAsync(rota);
                _ = await _notificacaoService.NotificarRota(rotaRequest.Ceps);
            } catch (Exception ex)
            {
                return new DataResponse<bool>(
                    new ErroResponse() { 
                        Exception = ex,
                        Message = "Erro ao persistir Rota no banco de dados."
                    }
                );
            }
            return new DataResponse<bool>(true);
        }
    }
}
