using DescarTec.Api.Config.Context;
using DescarTec.Api.Core.Interfaces.Repository;
using DescarTec.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace DescarTec.Api.Core.Impl.Repository
{
    public class PosicaoRepository : GenericRepository<Posicao, Guid>, IPosicaoRepository
    {
        private readonly MySqlContext _context;
        public PosicaoRepository(MySqlContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<Posicao>> ListPosicoesColetores()
        {
            List<Posicao> list = await _context.Posicao
                .Include(p => ((ColetorUser)p.User).Rota)
                .Where
                (
                    p => 
                        p.User.Discriminator == "ColetorUser" 
                        && 
                        ((ColetorUser)p.User).Rota.Any(r => r.DataFim >= DateTime.Now)
                )
                .ToListAsync();

            return list;
        }
    }
}
