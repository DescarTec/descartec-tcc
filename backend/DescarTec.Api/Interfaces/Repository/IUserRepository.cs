﻿using DescarTec.Api.Models;

namespace DescarTec.Api.Interfaces.Repository
{
    public interface IUserRepository : IGenericRepository<ApplicationUser, Guid>
    {
        Task<ApplicationUser?> GetByCpfCnpjAsync(string cpfCnpj);
        Task<List<ApplicationUser>> ListUsers();
    }
}
