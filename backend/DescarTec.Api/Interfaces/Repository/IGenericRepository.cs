namespace DescarTec.Api.Interfaces.Repository
{
    public interface IGenericRepository<T, T_KEY>
    where T : class
    where T_KEY : struct
    {
        Task<T> CreateAsync(T entity);
        Task<bool> DeleteAsync(T entity);
        T GetById(T_KEY id);
        Task<T> GetByIdAsync(T_KEY id);
        Task<int> InsertOrUpdateAsync(T entity);
        IQueryable<T> Query();
        Task<int> UpdateAsync(T entity);
    }
}
