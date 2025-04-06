using E_Mobile.API.Data;
using E_Mobile.API.Models;
using E_Mobile.API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace E_Mobile.API.Repositories
{
    public class CartRepository : Repository<CartItem>, ICartRepository
    {
        public CartRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<CartItem>> GetCartItemsByUserIdAsync(int userId)
        {
            return await _dbSet
                .Include(ci => ci.Product)
                .Where(ci => ci.UserId == userId)
                .ToListAsync();
        }

        public async Task<CartItem?> GetCartItemAsync(int userId, int productId)
        {
            return await _dbSet
                .FirstOrDefaultAsync(ci => ci.UserId == userId && ci.ProductId == productId);
        }

        public async Task ClearCartAsync(int userId)
        {
            var cartItems = await _dbSet.Where(ci => ci.UserId == userId).ToListAsync();
            _dbSet.RemoveRange(cartItems);
            await _context.SaveChangesAsync();
        }
    }
} 