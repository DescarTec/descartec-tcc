namespace DescarTec.Api.Models.Response
{
    public class ListResponse<T, T2>
    {
        public T? Data { get; set; }
        public MetaResponse<T2>? Meta { get; set; }
        public ErroResponse? Erro { get; set; }
        public ListResponse(T data, T2 meta)
        {
            var count = ((IEnumerable<T>)data!).Count();
            Data = data;
            Meta = new(meta, count);
        }
        public ListResponse(ErroResponse erroResponse)
        {
            Erro = erroResponse;
        }
    }
}
