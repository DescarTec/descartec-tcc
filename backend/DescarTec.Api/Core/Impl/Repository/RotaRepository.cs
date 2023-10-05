using DescarTec.Api.Config.Context;
using DescarTec.Api.Core.Interfaces.Repository;
using DescarTec.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace DescarTec.Api.Core.Impl.Repository
{
    public class RotaRepository : GenericRepository<Rota, Guid>, IRotaRepository
    {
        private readonly MySqlContext _context;
        public RotaRepository(MySqlContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Rota?> GetRotaAtiva(Guid userId)
        {
            var result = await _context.Rota.Where(r => userId == r.User.Id && r.DataFim >= DateTime.Now)
                .FirstOrDefaultAsync();

            return result;
        }
    }
}
