using AutoMapper;
using E_Mobile.API.DTOs;
using E_Mobile.API.Models;

namespace E_Mobile.API.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // User mappings
            CreateMap<User, UserDTO>();

            // Product mappings
            CreateMap<Product, ProductDTO>();
            CreateMap<ProductCreateDTO, Product>();
            CreateMap<ProductUpdateDTO, Product>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            // Cart mappings
            CreateMap<CartItem, CartItemDTO>();
            CreateMap<CartItemCreateDTO, CartItem>();
            CreateMap<CartItemUpdateDTO, CartItem>();
        }
    }
} 