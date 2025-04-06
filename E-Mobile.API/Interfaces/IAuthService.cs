using E_Mobile.API.DTOs;

namespace E_Mobile.API.Interfaces
{
    public interface IAuthService
    {
        Task<UserDTO> RegisterAsync(UserRegisterDTO userDto);
        Task<string> LoginAsync(UserLoginDTO userDto);
        Task<UserDTO> GetCurrentUserAsync(int userId);
    }
} 