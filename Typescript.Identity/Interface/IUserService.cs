using Typescript.Core.DTO;
using Typescript.Identity.Models;

namespace Typescript.Identity.Interface
{
    public interface IUserService 
    {
       Task<string> UserRegisterAsync(UserRegisterDTO userregister);
       Task<ApplicationUser> UserLoginAsync(UserLoginDTO userLogin);
    }
}
