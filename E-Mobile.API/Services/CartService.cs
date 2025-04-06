using AutoMapper;
using E_Mobile.API.DTOs;
using E_Mobile.API.Interfaces;
using E_Mobile.API.Models;
using E_Mobile.API.Repositories;

namespace E_Mobile.API.Services
{
    public interface ICartService
    {
        Task<CartDTO> GetCartAsync(int userId);
        Task<CartDTO> AddToCartAsync(int userId, int productId, int quantity);
        Task<CartDTO> UpdateCartItemAsync(int userId, int productId, int quantity);
        Task<CartDTO> RemoveFromCartAsync(int userId, int productId);
        Task<CartDTO> ClearCartAsync(int userId);
    }

    public class CartService : ICartService
    {
        private readonly ICartRepository _cartRepository;
        private readonly IProductRepository _productRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public CartService(ICartRepository cartRepository, IProductRepository productRepository, IUserRepository userRepository, IMapper mapper)
        {
            _cartRepository = cartRepository;
            _productRepository = productRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<CartDTO> GetCartAsync(int userId)
        {
            var cartItems = await _cartRepository.GetCartItemsByUserIdAsync(userId);
            var total = cartItems.Sum(item => item.Product.Price * item.Quantity);

            return new CartDTO
            {
                UserId = userId,
                Items = cartItems.Select(item => new CartItemDTO
                {
                    Id = item.Id,
                    ProductId = item.ProductId,
                    ProductName = item.Product.Name,
                    Price = item.Product.Price,
                    Quantity = item.Quantity
                }).ToList(),
                Total = total
            };
        }

        public async Task<CartDTO> AddToCartAsync(int userId, int productId, int quantity)
        {
            var product = await _productRepository.GetByIdAsync(productId)
                ?? throw new InvalidOperationException("Product not found");

            var user = await _userRepository.GetByIdAsync(userId)
                ?? throw new InvalidOperationException("User not found");

            if (product.Stock < quantity)
            {
                throw new InvalidOperationException("Not enough stock available");
            }

            var cartItem = await _cartRepository.GetCartItemAsync(userId, productId);
            if (cartItem != null)
            {
                cartItem.Quantity += quantity;
                await _cartRepository.UpdateAsync(cartItem);
            }
            else
            {
                cartItem = new CartItem
                {
                    UserId = userId,
                    User = user,
                    ProductId = productId,
                    Product = product,
                    Quantity = quantity
                };
                await _cartRepository.AddAsync(cartItem);
            }

            return await GetCartAsync(userId);
        }

        public async Task<CartDTO> UpdateCartItemAsync(int userId, int productId, int quantity)
        {
            var cartItem = await _cartRepository.GetCartItemAsync(userId, productId)
                ?? throw new InvalidOperationException("Cart item not found");

            var product = await _productRepository.GetByIdAsync(productId)
                ?? throw new InvalidOperationException("Product not found");

            if (quantity > product.Stock)
            {
                throw new InvalidOperationException("Not enough stock available");
            }

            if (quantity <= 0)
            {
                await _cartRepository.DeleteAsync(cartItem);
            }
            else
            {
                cartItem.Quantity = quantity;
                await _cartRepository.UpdateAsync(cartItem);
            }

            return await GetCartAsync(userId);
        }

        public async Task<CartDTO> RemoveFromCartAsync(int userId, int productId)
        {
            var cartItem = await _cartRepository.GetCartItemAsync(userId, productId)
                ?? throw new InvalidOperationException("Cart item not found");

            await _cartRepository.DeleteAsync(cartItem);
            return await GetCartAsync(userId);
        }

        public async Task<CartDTO> ClearCartAsync(int userId)
        {
            await _cartRepository.ClearCartAsync(userId);
            return await GetCartAsync(userId);
        }
    }
} 