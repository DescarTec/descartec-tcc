namespace DescarTec.Api.Models.Response
{
    public class ListResponse<T, T2>
    {
        public T? Data { get; set; }
        public MetaResponse<T2>? Meta { get; set; }
        public ErroResponse? Erro { get; set; }
        public ListResponse(T data, T2 meta, int count)
        {
            Data = data;
            Meta = new(meta, count);
        }
        public ListResponse(ErroResponse erroResponse)
        {
            Erro = erroResponse;
        }
    }
}
