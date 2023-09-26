using System.ComponentModel.DataAnnotations.Schema;
using DescarTec.Api.Models.Abstract;

namespace DescarTec.Api.Models
{
    public class Posicao : Coordenadas
    {
        public Guid Id { get; set; }
    }
}
