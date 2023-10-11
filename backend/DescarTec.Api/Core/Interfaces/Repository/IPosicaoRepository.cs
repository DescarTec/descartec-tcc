using DescarTec.Api.Models;

namespace DescarTec.Api.Core.Interfaces.Repository
{
    public interface IPosicaoRepository : IGenericRepository<Posicao, Guid>
    {
        Task<List<Posicao>> ListPosicoesColetores();
        Task<Posicao?> GetByUserIdAsync(Guid userId);
    }
}
