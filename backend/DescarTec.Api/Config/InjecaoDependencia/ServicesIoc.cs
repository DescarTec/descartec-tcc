using DescarTec.Api.Interfaces.Service;
using DescarTec.Api.Service;

namespace DescarTec.Api.Config.InjecaoDependencia
{
    public static class ServicesIoc
    {
        public static void Config(IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>();
        }
    }
}
