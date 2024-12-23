﻿using System.ComponentModel.DataAnnotations;

namespace Typescript.Core.DTO
{
    public class UserLoginDTO
    {
        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email")]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
