namespace DescarTec.Api.Models.Dto
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string UserName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string CpfCnpj { get; set; } = null!;
    }
}
