using Microsoft.AspNetCore.Identity;
using Typescript.Core.DTO;
using Typescript.Identity.Interface;
using Typescript.Identity.Models;

namespace Typescript.Identity.Repositories
{
    public class UserService : IUserService
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        public UserService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;

        }

        public async Task<string> UserRegisterAsync(UserRegisterDTO userregister)
        {
            try
            {
                ApplicationUser appUser = new ApplicationUser
                {
                    UserName = userregister.Name,
                    Email = userregister.Email
                };

                IdentityResult result = await _userManager.CreateAsync(appUser, userregister.Password);
                return "User Created Successfully";
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public async Task<string> UserLoginAsync(UserLoginDTO userLogin)
        {
            ApplicationUser appUser = await _userManager.FindByEmailAsync(userLogin.Email);
            if (appUser != null)
            {
                await _signInManager.SignOutAsync();
                SignInResult result = await _signInManager.PasswordSignInAsync(appUser, userLogin.Password, false, false);
                if (result.Succeeded)
                {
                    return "Login Successfully";
                }
            }
            return "Something went worng";
        }

    }
}
