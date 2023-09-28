namespace DescarTec.Api.Models.Response
{
    public class ResponseData<T>
    {
        public T? Data { get; set; }
        public ErroResponse? ErroResponse { get; set; }
        public ResponseData(T data) 
        { 
            Data = data;
        }
        public ResponseData(ErroResponse erroResponse) 
        {
            ErroResponse = erroResponse;
        }
    }

    public class ErroResponse
    {
        public Exception Exception { get; set; }
        public string Message { get; set; }
    }
}
