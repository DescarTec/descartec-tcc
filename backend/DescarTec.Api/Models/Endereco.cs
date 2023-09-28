using System.ComponentModel.DataAnnotations;

namespace DescarTec.Api.Models
{
    public class Endereco
    {
        public Guid Id { get; set; }
        public string Cep { get; set; } = null!;
        public string Logradouro { get; set; } = null!;
        public string? Bairro { get; set; }
        public string? Localidade { get; set; }
        public string Uf { get; set; } = null!;
        public string Ibge { get; set; } = null!;
        public string Ddd { get; set; } = null!;
    }
}
