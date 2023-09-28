using DescarTec.Api.Models;

namespace DescarTec.Api.Core.Interfaces.Repository
{
    public interface INotificacaoRepository : IGenericRepository<Notificacao, Guid>
    {
        Task<List<Notificacao>> GetByUserIdAsync(Guid userId);
    }
}
