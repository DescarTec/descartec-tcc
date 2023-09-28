using DescarTec.Api.Models;

namespace DescarTec.Api.Core.Interfaces.Service
{
    public interface IEmailService
    {
        bool SendEmailRota(ApplicationUser user, ColetorUser coletor);
    }
}