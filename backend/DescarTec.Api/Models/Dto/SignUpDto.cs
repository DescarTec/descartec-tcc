using System.ComponentModel.DataAnnotations;
using DescarTec.Api.Models;

namespace DescarTec.Api.Models.Dto
{
    public partial class SignUpDto
    {
        [Required(ErrorMessage = "User Name is required")]
        public string Username { get; set; }

        [Required(ErrorMessage = "NomeCompleto is required")]
        public string NomeCompleto { get; set; }

        [Required(ErrorMessage = "DataNascimento is required")]
        public DateTime DataNascimento { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string PasswordConfirm { get; set; }

        [Required(ErrorMessage = "PhoneNumber is required")]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Cep is required")]
        public string Cep { get; set; }

        [Required(ErrorMessage = "Logradouro is required")]
        public string Logradouro { get; set; }

        [Required(ErrorMessage = "Bairro is required")]
        public string Bairro { get; set; }

        [Required(ErrorMessage = "Localidade is required")]
        public string Localidade { get; set; }

        [Required(ErrorMessage = "Uf is required")]
        public string Uf { get; set; }

        [Required(ErrorMessage = "Ibge is required")]
        public string Ibge { get; set; }

        [Required(ErrorMessage = "Ddd is required")]
        public string Ddd { get; set; }
    }
}