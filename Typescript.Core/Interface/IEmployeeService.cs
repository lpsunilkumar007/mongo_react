using Typescript.Core.DTO;
using Typescript.Core.Models;

namespace Typescript.Core.Interface
{
    public interface IEmployeeService
    {
        Task<string> CreateAsync(EmployeeDTO request);
        Task<List<Employee>> GetAllAsync();
        Task<Employee> GetByIdAsync(string id);
        Task<string> UpdateAsyns(string id, Employee request);
        Task<string> DeleteAsync(string id);
    }
}
