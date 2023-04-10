using DescarTec.Api.Config.Context;
using DescarTec.Api.Core.Interfaces.Repository;
using DescarTec.Api.Models;

namespace DescarTec.Api.Core.Impl.Repository
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
