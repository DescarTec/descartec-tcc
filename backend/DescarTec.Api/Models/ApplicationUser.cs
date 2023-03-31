using Microsoft.AspNetCore.Identity;

namespace DescarTec.Api.Models
{
    public class ApplicationUser : IdentityUser<Guid>
    {        
        public Guid Id { get; set; }
        public string CpfCnpj { get; set; } = null!;
        public string Nome { get; set; } = null!;
        public DateTime DataNascimento { get; set; }
        public string Endereco { get; set; } = null!;
        public string? Endereco2 { get; set; }
        public int Cep { get; set; } 
    }
}
