using DescarTec.Api.Models;

namespace DescarTec.Api.Core.Interfaces.Repository
{
    public interface IRotaRepository : IGenericRepository<Rota, Guid>
    {
        Task<Rota?> GetRotaAtiva(Guid userId);
    }
}
