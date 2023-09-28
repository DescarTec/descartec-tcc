namespace DescarTec.Api.Models.Response
{
    public class MetaResponse<T>
    {
        public MetaResponse(T info, int count) 
        {
            Info = info;
            Count = count;
        }

        public int Count { get; set; }
        public T Info { get; set; }
    }
}
