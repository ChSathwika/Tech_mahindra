using E_Mobile.API.Data;
using E_Mobile.API.Models;
using E_Mobile.API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace E_Mobile.API.Repositories
{
    public interface IProductRepository : IRepository<Product>
    {
        Task<IEnumerable<Product>> SearchAsync(string searchTerm);
        Task<IEnumerable<Product>> GetByBrandAsync(string brand);
        Task<IEnumerable<Product>> GetByCategoryAsync(string category);
    }

    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Product>> SearchAsync(string searchTerm)
        {
            return await _dbSet
                .Where(p => p.Name.Contains(searchTerm) || 
                           p.Description.Contains(searchTerm) || 
                           p.Brand.Contains(searchTerm) || 
                           p.Category.Contains(searchTerm))
                .ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetByBrandAsync(string brand)
        {
            return await _dbSet
                .Where(p => p.Brand == brand)
                .ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetByCategoryAsync(string category)
        {
            return await _dbSet
                .Where(p => p.Category == category)
                .ToListAsync();
        }
    }
} 