using Microsoft.AspNetCore.Identity;

namespace DescarTec.Api.Models
{
    public class UserBase : IdentityUser<Guid>
    {
        public string Nome { get; set; } = null!;
        public string Discriminator { get; set; } = null!;
    }
}
