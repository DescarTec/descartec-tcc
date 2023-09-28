using DescarTec.Api.Core.Interfaces.Repository;
using DescarTec.Api.Core.Interfaces.Service;
using DescarTec.Api.Models;
using DescarTec.Api.Models.Response;

namespace DescarTec.Api.Core.Impl.Service
{
    public class NotificacaoService : INotificacaoService
    {
        private readonly IAuthService _authService;
        private readonly IEmailService _emailService;
        private readonly INotificacaoRepository _notificacaoRepository;

        public NotificacaoService(IAuthService authService, IEmailService emailService, INotificacaoRepository notificacaoRepository)
        {
            _authService = authService;
            _emailService = emailService;
            _notificacaoRepository = notificacaoRepository;
        }

        public async Task<ResponseData<bool>> NotificarRota(List<string> ceps)
        {
            var coletor = (ColetorUser)await _authService.GetCurrentUser();

            int retEmailComErro = 0;
            int retNotificacaoComErro = 0;

            foreach (var cep in ceps)
            {
                var usersPorCep = await _authService.GetListUserByCep(cep);
                foreach (var user in usersPorCep)
                {
                    if (_emailService.SendEmailRota(user, coletor) == false) retEmailComErro++;
                    if (await CriarNotificacao(user, coletor) == false) retNotificacaoComErro++;
                }
            }
            if (retEmailComErro == 0 && retNotificacaoComErro == 0) return new ResponseData<bool>(true);
            return new ResponseData<bool>(
                new ErroResponse()
                {
                    Exception = new Exception("Incomplete exception"),
                    Message = $"{retEmailComErro} e-mails com erro não foram enviadas.\n{retNotificacaoComErro} notificações com erro não foram enviadas."
                }
            );

        }
        public async Task<bool> CriarNotificacao(ApplicationUser user, ColetorUser coletor)
        {
            var notificacao = new Notificacao().NotificacaoRota(user, coletor);
            try
            {
                await _notificacaoRepository.CreateAsync(notificacao);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<ResponseData<List<Notificacao>>> GetNotificacoes()
        {
            var curretUser = await _authService.GetCurrentUser();
            try
            {
                var result = await _notificacaoRepository.GetByUserIdAsync(curretUser.Id);
                return new ResponseData<List<Notificacao>>(result);
            }
            catch
            {
                return new ResponseData<List<Notificacao>>(new ErroResponse()
                {
                    Exception = new Exception("Context Error"),
                    Message = "Erro ao obter notificacoes no contexto"
                });
            }
        }
    }
}
