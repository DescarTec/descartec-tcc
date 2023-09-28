using DescarTec.Api.Config.Context;
using DescarTec.Api.Core.Interfaces.Repository;
using DescarTec.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace DescarTec.Api.Core.Impl.Repository
{
    public class NotificacaoRepository : GenericRepository<Notificacao, Guid>, INotificacaoRepository
    {
        private readonly MySqlContext _context;
        public NotificacaoRepository(MySqlContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<Notificacao>> GetByUserIdAsync(Guid userId)
        {
            List<Notificacao> list = await _context.Notificacao.Where(u => userId == u.ApplicationUserId).ToListAsync();

            return list;
        }
    }
}
