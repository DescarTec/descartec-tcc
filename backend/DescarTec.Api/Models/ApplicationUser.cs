using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DescarTec.Api.Models
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public string CpfCnpj { get; set; } = null!;
        public string Nome { get; set; } = null!;
        public DateTime DataNascimento { get; set; }
        public Guid EnderecoId { get; set; }
        [ForeignKey("EnderecoId")]
        public Endereco Endereco { get; set; } = null!;
    }

    public class Endereco
    {
        public Guid Id { get; set; }
        [Required]
        public string Cep { get; set; } = null!;
        public string Logradouro { get; set; } = null!;
        public string? Bairro { get; set; }
        public string? Localidade { get; set; }
        public string Uf { get; set; } = null!;
        public string Ibge { get; set; } = null!;
        public string Ddd { get; set; } = null!;
    }
}
