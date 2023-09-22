using System.ComponentModel.DataAnnotations.Schema;

namespace DescarTec.Api.Models
{
    public class Posicao
    {
        public string Id { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longetude { get; set; }
    }
}
