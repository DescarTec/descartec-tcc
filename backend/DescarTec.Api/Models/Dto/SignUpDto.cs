using System.ComponentModel.DataAnnotations;
using Lombok.NET;

namespace DescarTec.Api.Domain.Models.DTOs
{
    [With]
    [AllArgsConstructor]
    public partial class SignUpDto
    {
        [Required(ErrorMessage = "User Name is required")]
        public string Username { get; set; }

        [Required(ErrorMessage = "NomeCompleto is required")]
        public string NomeCompleto { get; set; }

        [Required(ErrorMessage = "DataNascimento is required")]
        public DateTime DataNascimento { get; set; }

        [Required(ErrorMessage = "Endereco is required")]
        public string Endereco { get; set; }

        [Required(ErrorMessage = "Cep is required")]
        public string Cep { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string PasswordConfirm { get; set; }

        [Required(ErrorMessage = "Cpf/Cnpj is required")]
        public string CpfCnpj { get; set; }

        [Required(ErrorMessage = "PhoneNumber is required")]
        public string PhoneNumber { get; set; }
    }
}