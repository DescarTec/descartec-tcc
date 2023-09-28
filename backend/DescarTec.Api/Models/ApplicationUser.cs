using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace DescarTec.Api.Models
{
    public class ApplicationUser : UserBase
    {
        public DateTime DataNascimento { get; set; }
        public Guid EnderecoId { get; set; }
        public Endereco? Endereco { get; set; }
        [JsonIgnore]
        public List<Notificacao> Notificacao{ get; set; }
    }
}
