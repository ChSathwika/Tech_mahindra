namespace E_Mobile.API.DTOs
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required decimal Price { get; set; }
        public required int Stock { get; set; }
        public required string ImageUrl { get; set; }
        public required string Brand { get; set; }
        public required string Category { get; set; }
        public required List<string> Features { get; set; }
        public required List<string> Specifications { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class ProductCreateDTO
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required decimal Price { get; set; }
        public required int Stock { get; set; }
        public required string ImageUrl { get; set; }
        public required string Brand { get; set; }
        public required string Category { get; set; }
        public required List<string> Features { get; set; }
        public required List<string> Specifications { get; set; }
    }

    public class ProductUpdateDTO
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public int? Stock { get; set; }
        public string? ImageUrl { get; set; }
        public string? Brand { get; set; }
        public string? Category { get; set; }
        public List<string>? Features { get; set; }
        public List<string>? Specifications { get; set; }
    }
} 