namespace DescarTec.Api.Models.Dto
{
    public class SsoDto
    {
        public string Access_token { get; set; }
        public DayOfWeek Expiration { get; set; }
        public ApplicationUser User { get; set; }

        public SsoDto(string access_token, ApplicationUser user)
        {
            this.Access_token = access_token;
            this.Expiration = DateTime.Now.DayOfWeek;
            this.User = user;
        }
    }
}
