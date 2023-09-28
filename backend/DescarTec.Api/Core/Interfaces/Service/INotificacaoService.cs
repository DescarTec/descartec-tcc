using DescarTec.Api.Models;
using DescarTec.Api.Models.Response;

namespace DescarTec.Api.Core.Interfaces.Service
{
    public interface INotificacaoService
    {
        Task<bool> CriarNotificacao(ApplicationUser user, ColetorUser coletor);
        Task<ResponseData<bool>> NotificarRota(List<string> ceps);
        Task<ResponseData<List<Notificacao>>> GetNotificacoes();
    }
}