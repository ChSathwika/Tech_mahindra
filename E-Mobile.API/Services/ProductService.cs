using AutoMapper;
using E_Mobile.API.DTOs;
using E_Mobile.API.Models;
using E_Mobile.API.Repositories;

namespace E_Mobile.API.Services
{
    public interface IProductService
    {
        Task<IEnumerable<ProductDTO>> GetAllProductsAsync();
        Task<ProductDTO> GetProductByIdAsync(int id);
        Task<IEnumerable<ProductDTO>> GetProductsByCategoryAsync(string category);
        Task<IEnumerable<ProductDTO>> GetProductsByBrandAsync(string brand);
        Task<IEnumerable<ProductDTO>> SearchProductsAsync(string searchTerm);
        Task<ProductDTO> CreateProductAsync(ProductCreateDTO productDto);
        Task<ProductDTO> UpdateProductAsync(int id, ProductUpdateDTO productDto);
        Task DeleteProductAsync(int id);
    }

    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductService(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProductDTO>> GetAllProductsAsync()
        {
            var products = await _productRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<ProductDTO>>(products);
        }

        public async Task<ProductDTO> GetProductByIdAsync(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
                throw new Exception("Product not found");

            return _mapper.Map<ProductDTO>(product);
        }

        public async Task<IEnumerable<ProductDTO>> GetProductsByCategoryAsync(string category)
        {
            var products = await _productRepository.GetByCategoryAsync(category);
            return _mapper.Map<IEnumerable<ProductDTO>>(products);
        }

        public async Task<IEnumerable<ProductDTO>> GetProductsByBrandAsync(string brand)
        {
            var products = await _productRepository.GetByBrandAsync(brand);
            return _mapper.Map<IEnumerable<ProductDTO>>(products);
        }

        public async Task<IEnumerable<ProductDTO>> SearchProductsAsync(string searchTerm)
        {
            var products = await _productRepository.SearchAsync(searchTerm);
            return _mapper.Map<IEnumerable<ProductDTO>>(products);
        }

        public async Task<ProductDTO> CreateProductAsync(ProductCreateDTO productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            await _productRepository.AddAsync(product);
            return _mapper.Map<ProductDTO>(product);
        }

        public async Task<ProductDTO> UpdateProductAsync(int id, ProductUpdateDTO productDto)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
                throw new Exception("Product not found");

            _mapper.Map(productDto, product);
            await _productRepository.UpdateAsync(product);
            return _mapper.Map<ProductDTO>(product);
        }

        public async Task DeleteProductAsync(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
                throw new Exception("Product not found");

            await _productRepository.DeleteAsync(product);
        }
    }
} 