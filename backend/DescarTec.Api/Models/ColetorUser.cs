using Microsoft.AspNetCore.Identity;

namespace DescarTec.Api.Models
{
    public class ColetorUser : UserBase
    {
        public Posicao? Posicao { get; set; }
    }
}
