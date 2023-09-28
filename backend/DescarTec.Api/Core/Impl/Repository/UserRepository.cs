using DescarTec.Api.Config.Context;
using DescarTec.Api.Core.Interfaces.Repository;
using DescarTec.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace DescarTec.Api.Core.Impl.Repository;

public class UserRepository : GenericRepository<ApplicationUser, Guid>, IUserRepository
{
    private readonly MySqlContext _context;
    public UserRepository(MySqlContext context) : base(context)
    {
        _context = context;
    }

    public async Task<List<ApplicationUser>> ListUsers()
    {
        List<ApplicationUser> list = await _context.User.ToListAsync();

        return list;
    }
    public async Task<List<ApplicationUser>> GetListUserByCep(string cep)
    {
        List<ApplicationUser> list = await _context.User.Include(u => u.Endereco).Where(u => cep == u.Endereco.Cep).ToListAsync();

        return list;
    }
}