namespace DescarTec.Api.Models.Request
{
    public class RotaRequest
    {
        public List<string> Ceps { get; set; }
        public DateTime DataFim { get; set; }
    }
}
