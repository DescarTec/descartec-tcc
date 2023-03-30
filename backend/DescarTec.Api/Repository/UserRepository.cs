using DescarTec.Api.Config.Context;
using DescarTec.Api.Interfaces.Repository;
using DescarTec.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace MarketPlace.Impl.Repository;

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

    public async Task<ApplicationUser?> GetByCpfCnpjAsync(string cpfCnpj)
    {
        ApplicationUser? applicationUser = await _context.User.Where(p => p.CpfCnpj.Equals(cpfCnpj)).FirstOrDefaultAsync();
        return applicationUser;
    }
}