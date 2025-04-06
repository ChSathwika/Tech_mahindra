namespace E_Mobile.API.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string Role { get; set; }
    }

    public class UserLoginDTO
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }

    public class UserRegisterDTO
    {
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
} 