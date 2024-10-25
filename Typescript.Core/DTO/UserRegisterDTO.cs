using System.ComponentModel.DataAnnotations;

namespace Typescript.Core.DTO
{
    public class UserRegisterDTO
    {
        [Required]
        public string Name { get; set; }
        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email")]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
