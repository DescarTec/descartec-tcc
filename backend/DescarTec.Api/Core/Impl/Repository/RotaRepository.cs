using DescarTec.Api.Config.Context;
using DescarTec.Api.Core.Interfaces.Repository;
using DescarTec.Api.Models;

namespace DescarTec.Api.Core.Impl.Repository
{
    public class RotaRepository : GenericRepository<Rota, Guid>, IRotaRepository
    {
        private readonly MySqlContext _context;
        public RotaRepository(MySqlContext context) : base(context)
        {
            _context = context;
        }
    }
}
