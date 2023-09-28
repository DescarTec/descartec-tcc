using DescarTec.Api.Models;

namespace DescarTec.Api.Core.Interfaces.Repository
{
    public interface IColetorUserRepository
    {
        Task<List<ColetorUser>> ListColetorUsers();
    }
}