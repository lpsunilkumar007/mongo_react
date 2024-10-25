using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace Typescript.Identity.Models
{
    [CollectionName("Users")]
    public class ApplicationUser : MongoIdentityUser<string>
    {
    }
}
