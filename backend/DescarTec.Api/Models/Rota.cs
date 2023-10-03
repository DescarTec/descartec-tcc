using DescarTec.Api.Models.Request;
using System.Runtime.ConstrainedExecution;

namespace DescarTec.Api.Models
{
    public class Rota
    {
        public Guid Id { get; set; }
        public ICollection<RotaCep> RotaCeps { get; set; }
        public DateTime DataInicio { get; private set; }
        public DateTime DataFim { get; set; }
        public UserBase User { get; set; }

        public Rota()
        {
        }
        public Rota(RotaRequest rotaRequest, UserBase user)
        {
            DataInicio = DateTime.Now;
            DataFim = rotaRequest.DataFim;
            User = user;

            var rotaCeps = new List<RotaCep>();
            rotaRequest.Ceps.ForEach(c =>
            {
                rotaCeps.Add(new RotaCep() { Cep = new Cep() { Value = c }, Rota = this });
            });
            RotaCeps = rotaCeps;
        }
    }
    public class RotaCep
    {
        public Guid Id { get; set; }
        public Guid RotaId { get; set; }
        public Guid CepId { get; set; }

        public Rota Rota { get; set; }
        public Cep Cep { get; set; }
    }
    public class Cep
    {
        public Guid Id { get; set; }
        public string Value { get; set; }
    }
}
