using System.ComponentModel.DataAnnotations.Schema;
using DescarTec.Api.Models.Abstract;
using DescarTec.Api.Models.Request;

namespace DescarTec.Api.Models
{
    public class Posicao : Coordenadas
    {
        public Guid Id { get; set; }
        public UserBase User { get; set; }
        public Posicao() { }
        public Posicao(PosicaoRequest posicaoResquest, UserBase user) { 
            User = user;
            Latitude = posicaoResquest.Latitude;
            Longitude = posicaoResquest.Longitude;
        }
    }
}
