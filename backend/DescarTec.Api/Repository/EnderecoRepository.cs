using DescarTec.Api.Config.Context;
using DescarTec.Api.Interfaces.Repository;
using DescarTec.Api.Models;

namespace DescarTec.Api.Repository
{
    public class EnderecoRepository : GenericRepository<Endereco, Guid>, IEnderecoRepository
    {
        private readonly MySqlContext _context;
        public EnderecoRepository(MySqlContext context) : base(context)
        {
            _context = context;
        }
    
    }
}
