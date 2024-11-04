using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Typescript.Core.DTO;
using Typescript.Core.Interface;
using Typescript.Core.Models;
using Typescript.Data.Connection;

namespace Typescript.Service.Repositories
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IMongoCollection<Employee> _employeeCollection;

        public EmployeeService(IOptions<AppDatabaseSettings> databaseSettings)
        {
            var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
            _employeeCollection = mongoDatabase.GetCollection<Employee>("Employee");
        }

        public async Task<Employee> CreateAsync(EmployeeDTO request)
        {
            var employee = new Employee
            {
                Id = ObjectId.GenerateNewId().ToString(),
                FirstName = request.FirstName,
                Email = request.Email,
                LastName = request.LastName,
                LastSalary = request.LastSalary,
                DOB = request.DOB,
                DateOfJoining = request.DateOfJoining,
            };

            await _employeeCollection.InsertOneAsync(employee);
            return employee;
        }

        public async Task<List<Employee>> GetAllAsync()
        {
            var list = await _employeeCollection.Find(_ => true).ToListAsync();
            return list;
        }

        public Task<Employee> GetByIdAsync(string id)
        {
            var emp = _employeeCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
            return emp;
        }

        public async Task<string> UpdateAsyns(string id, Employee request)
        {
            await _employeeCollection.ReplaceOneAsync(x => x.Id == id, request);
            return "Employee updated successfully.";
        }

        public async Task<string> DeleteAsync(string id)
        {
            await _employeeCollection.DeleteOneAsync(x => x.Id == id);
            return "Employee deleted successfully.";
        }

    }
}
