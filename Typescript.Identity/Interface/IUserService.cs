using Typescript.Core.DTO;

namespace Typescript.Identity.Interface
{
    public interface IUserService 
    {
       Task<string> UserRegisterAsync(UserRegisterDTO userregister);
       Task<string> UserLoginAsync(UserLoginDTO userLogin);
    }
}
