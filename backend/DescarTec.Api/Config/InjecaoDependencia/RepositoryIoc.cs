using DescarTec.Api.Core.Impl.Repository;
using DescarTec.Api.Core.Interfaces.Repository;

namespace DescarTec.Api.Config.InjecaoDependencia
{
    public static class RepositoryIoc
    {
        public static void Config(IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IColetorUserRepository, ColetorUserRepository>();
            services.AddScoped<IEnderecoRepository, EnderecoRepository>();
            services.AddScoped<INotificacaoRepository, NotificacaoRepository>();
            services.AddScoped<IRotaRepository, RotaRepository>();
            services.AddScoped<IPosicaoRepository, PosicaoRepository>();
        }
    }
}
