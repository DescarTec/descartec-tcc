using DescarTec.Api.Models.Abstract;

namespace DescarTec.Api.Models.Dto
{
    public class PosicaoDto : Coordenadas
    {
        public string ColetorName { get; set; }
        public DateTime DataFim { get; set; }

        public PosicaoDto(Posicao posicao) {
            ColetorName = posicao.User.Nome;
            DataFim = ((ColetorUser)posicao.User).Rota.First(r => r.DataFim >= DateTime.Now).DataFim;
            Longitude = posicao.Longitude;
            Latitude = posicao.Latitude;
        }
    }
}
