using DescarTec.Api.Models.Abstract;

namespace DescarTec.Api.Models.Dto
{
    public class PosicaoDto : Coordenadas
    {
        public string ColetorName { get; set; }
        public DateTime DataFim { get; set; }

        public PosicaoDto(Posicao posicao, DateTime dataFim) {
            ColetorName = posicao.User.Nome;
            DataFim = dataFim;
            Longitude = posicao.Longitude;
            Latitude = posicao.Latitude;
        }
    }
}
