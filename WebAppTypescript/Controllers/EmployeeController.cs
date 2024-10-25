using Microsoft.AspNetCore.Mvc;
using Typescript.Core.DTO;
using Typescript.Core.Interface;
using Typescript.Core.Models;

namespace WebAppTypescriptApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(EmployeeDTO request)
        {
            try
            {
                if (request == null) return BadRequest("Invalid employee data");
                var response = await _employeeService.CreateAsync(request);
                return Ok(new { message = response });
            }
            catch (Exception ex)
            {
                return BadRequest(new { errorMessage = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetListAsync()
        {
            try
            {
                var response = await _employeeService.GetAllAsync();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { errorMessage = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(string id)
        {
            try
            {
                var response = await _employeeService.GetByIdAsync(id);
                if (response == null) return BadRequest(new { errorMessage = "Not found" });
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { errorMessage = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(string id, Employee request)
        {
            try
            {
                var response = await _employeeService.GetByIdAsync(id);
                if (response == null) return BadRequest(new { errorMessage = "Not found" });
                var result = await _employeeService.UpdateAsyns(id, request);
                return Ok(new { message = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { errorMessage = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(string id)
        {
            try
            {
                var response = await _employeeService.GetByIdAsync(id);
                if (response == null) return BadRequest(new { errorMessage = "Not found" });
                var result = await _employeeService.DeleteAsync(id);
                return Ok(new { message = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { errorMessage = ex.Message });
            }
        }
    }
}
