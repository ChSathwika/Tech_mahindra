using E_Mobile.API.Models;

namespace E_Mobile.API.Interfaces
{
    public interface ICartRepository : IRepository<CartItem>
    {
        Task<IEnumerable<CartItem>> GetCartItemsByUserIdAsync(int userId);
        Task<CartItem?> GetCartItemAsync(int userId, int productId);
        Task ClearCartAsync(int userId);
    }
} 