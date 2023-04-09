using DescarTec.Api.Models;
using Microsoft.AspNetCore.Identity;

namespace DescarTec.Api.Config.Role
{
    public static class RoleControl
    {
        public static async Task AddAdminRole(this IServiceScope scope)
        {
            try
            {
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
                // Obter o serviço de gerenciamento de roles

                // Verificar se a role "Admin" já existe
                var adminRoleExists = await roleManager.RoleExistsAsync("Admin");

                if (!adminRoleExists)
                {
                    // Criar uma nova instância da classe "ApplicationRole"
                    var adminRole = new ApplicationRole
                    {
                        Name = "Admin",
                        NormalizedName = "ADMIN"
                    };

                    // Criar a role "Admin"
                    await roleManager.CreateAsync(adminRole);
                }
            }
            catch (Exception ex)
            {
                // Lidar com o erro aqui
                Console.WriteLine($"Ocorreu um erro: {ex.Message}");
            }
        }
    }
}
