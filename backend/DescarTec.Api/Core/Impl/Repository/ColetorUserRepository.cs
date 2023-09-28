using DescarTec.Api.Config.Context;
using DescarTec.Api.Core.Interfaces.Repository;
using DescarTec.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace DescarTec.Api.Core.Impl.Repository
{
    public class ColetorUserRepository : GenericRepository<ColetorUser, Guid>, IColetorUserRepository
    {
        private readonly MySqlContext _context;
        public ColetorUserRepository(MySqlContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<ColetorUser>> ListColetorUsers()
        {
            List<ColetorUser> list = await _context.ColetorUser.ToListAsync();

            return list;
        }
    }
}
