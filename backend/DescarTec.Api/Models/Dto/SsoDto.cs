namespace DescarTec.Api.Models.Dto
{
    public class SsoDto
    {
        public string Access_token { get; set; }
        public DayOfWeek Expiration { get; set; }
        public UserBase User { get; set; }

        public SsoDto(string access_token, UserBase user)
        {
            this.Access_token = access_token;
            this.Expiration = DateTime.UtcNow.DayOfWeek;
            this.User = user;
        }
    }
}
