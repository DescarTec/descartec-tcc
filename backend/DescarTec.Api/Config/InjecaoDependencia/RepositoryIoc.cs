using DescarTec.Api.Interfaces.Repository;
using MarketPlace.Impl.Repository;

namespace DescarTec.Api.Config.InjecaoDependencia
{
    public static class RepositoryIoc
    {
        public static void Config(IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
        }
    }
}
