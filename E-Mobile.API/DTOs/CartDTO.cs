namespace E_Mobile.API.DTOs
{
    public class CartDTO
    {
        public int Id { get; set; }
        public required int UserId { get; set; }
        public required List<CartItemDTO> Items { get; set; }
        public decimal Total { get; set; }
    }

    public class CartItemDTO
    {
        public int Id { get; set; }
        public required int ProductId { get; set; }
        public required string ProductName { get; set; }
        public required decimal Price { get; set; }
        public required int Quantity { get; set; }
    }

    public class CartItemCreateDTO
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }

    public class CartItemUpdateDTO
    {
        public int Quantity { get; set; }
    }
} 