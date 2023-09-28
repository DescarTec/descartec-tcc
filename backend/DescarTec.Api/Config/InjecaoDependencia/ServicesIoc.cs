using DescarTec.Api.Core.Impl.Service;
using DescarTec.Api.Core.Interfaces.Service;

namespace DescarTec.Api.Config.InjecaoDependencia
{
    public static class ServicesIoc
    {
        public static void Config(IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<INotificacaoService, NotificacaoService>();
        }
    }
}
