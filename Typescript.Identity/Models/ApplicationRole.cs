using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace Typescript.Identity.Models
{
    [CollectionName("Roles")]
    public class ApplicationRole : MongoIdentityRole<string>
    {

    }
}
