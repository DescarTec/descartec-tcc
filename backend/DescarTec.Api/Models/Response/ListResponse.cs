namespace DescarTec.Api.Models.Response
{
    public class ListResponse<T, T2>
    {
        public List<T>? Data { get; set; }
        public MetaResponse<T2>? Meta { get; set; }
        public ErroResponse? Erro { get; set; }
        public ListResponse(List<T> data, T2 meta)
        {
            Data = data;
            Meta = new(meta, data.Count);
        }
        public ListResponse(ErroResponse erroResponse)
        {
            Erro = erroResponse;
        }
    }
}
