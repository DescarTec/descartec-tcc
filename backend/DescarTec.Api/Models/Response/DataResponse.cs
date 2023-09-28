namespace DescarTec.Api.Models.Response
{
    public class DataResponse<T>
    {
        public T? Data { get; set; }
        public ErroResponse? Erro { get; set; }
        public DataResponse(T data) 
        { 
            Data = data;
        }
        public DataResponse(ErroResponse erroResponse) 
        {
            Erro = erroResponse;
        }
    }
}
