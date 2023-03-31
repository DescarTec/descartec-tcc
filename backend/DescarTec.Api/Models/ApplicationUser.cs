using Microsoft.AspNetCore.Identity;

namespace DescarTec.Api.Models
{
    public class ApplicationUser : IdentityUser<Guid>
    {        
        public string CpfCnpj { get; set; } = null!;
        public string Nome { get; set; } = null!;
        public DateTime DataNascimento { get; set; }
        public string Endereco { get; set; } = null!;
        public string Cep { get; set; } = null!;
    }
}
