namespace DescarTec.Api.Models
{
    public class Notificacao
    {
        public Notificacao() 
        {
            Lido = false;
            Data = DateTime.Now;
        }

        public Guid Id { get; set; }
        public string Titulo { get; private set; }
        public string Body { get; private set; }
        public bool Lido { get; private set; }
        public DateTime Data { get; private set; }

        public Guid ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; private set; }

        public Notificacao NotificacaoRota(ApplicationUser userOwner, ColetorUser coletor)
        {
            ApplicationUserId = userOwner.Id;
            ApplicationUser = userOwner;
            Titulo = $"Um coletor está a caminho de você.";
            Body = $"{coletor.Nome} iniciou uma rota e passará em sua residência de CEP:{userOwner.Endereco!.Cep}";
            return this;
        }
    }
}
