using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Typescript.Core.DTO;
using Typescript.Identity.Interface;
using Typescript.Identity.Models;

namespace WebAppTypescriptApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync(UserRegisterDTO request)
        {
            var response = await _userService.UserRegisterAsync(request);
            return Ok(new { message = response });
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync(UserLoginDTO request)
        {
            var response = await _userService.UserLoginAsync(request);
            return Ok(new { message = response });
        }

    }
}
