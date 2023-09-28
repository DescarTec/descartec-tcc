using DescarTec.Api.Core.Interfaces.Service;
using DescarTec.Api.Models;
using System.Globalization;
using System.Net.Mail;

namespace DescarTec.Api.Core.Impl.Service
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public bool SendEmailRota(ApplicationUser user, ColetorUser coletor)
        {
            string emailTo = user.NormalizedEmail;
            string emailFrom = _configuration["NetworkCredential:UserName"];
            string password = _configuration["NetworkCredential:Password"];

            MailMessage message = new(emailFrom, emailTo)
            {
                Subject = "Coletor está indo até você.",
                IsBodyHtml = true
            };

            string pathEmail = "";
            try
            {
                pathEmail = "./EmailView/email-html/email-validation-html/email-validate-pt-br.html";
                var body = @File.ReadAllText(pathEmail);
                body = body.Replace("{NOME}", user.Nome);
                message.Body = body;
            }
            catch (Exception e)
            {
                var ex = new FileLoadException($"Erro ao tentar carregar html do email. PATH = '{pathEmail}'", e);
                Console.WriteLine("ArgumentException: {0}",
                    ex.ToString());
                return false;
            }

            try
            {
                _ = int.Parse(user.Endereco!.Cep, NumberStyles.None);

            }
            catch
            {
                var ex =  new ArgumentException("CEP invalido");
                Console.WriteLine("ArgumentException: {0}",
                    ex.ToString());
                return false;
            }

            SmtpClient client = new("smtp.gmail.com")
            {
                UseDefaultCredentials = false,
                EnableSsl = true,
                Credentials = new System.Net.NetworkCredential(emailFrom, password)
            };

            try
            {
                client.Send(message);
                return true;
            }
            catch (SmtpFailedRecipientsException ex)
            {
                Console.WriteLine("Exception caught in CreateTestMessage2(): {0}",
                    ex.ToString());
                return false;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return false;
            }
        }
    }
}
