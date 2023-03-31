using System.ComponentModel.DataAnnotations;

namespace DescarTec.Api.Models.Dto
{
    public class SignInDto
    {
        [Required(ErrorMessage = "User Name is required")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

        public SignInDto(string username, string password)
        {
            Username = username;
            Password = password;
        }
    }
}
