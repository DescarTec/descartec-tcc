using DescarTec.Api.Models;

namespace DescarTec.Api.Core.Interfaces.Repository
{
    public interface IUserRepository : IGenericRepository<ApplicationUser, Guid>
    {
        Task<List<ApplicationUser>> ListUsers();
    }
}
