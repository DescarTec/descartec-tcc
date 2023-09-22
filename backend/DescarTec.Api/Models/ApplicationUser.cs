using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DescarTec.Api.Models
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public string Nome { get; set; } = null!;
        public DateTime DataNascimento { get; set; }
        public Guid EnderecoId { get; set; }

        [ForeignKey("EnderecoId")]
        public Endereco Endereco { get; set; } = null!;

        [JsonIgnore]
        [ForeignKey("PosicaoId")]
        public Posicao Posicao{ get; set; } = null!;
    }
}
