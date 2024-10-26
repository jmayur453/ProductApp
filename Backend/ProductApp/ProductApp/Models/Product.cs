using System.ComponentModel.DataAnnotations;

namespace ProductApp.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public required string Title { get; set; }
        [StringLength(250)]
        public required string Description { get; set; }
        public required int Quantity { get; set; }
        public required double Price { get; set; }
        public required DateTime Date { get; set; }
        public string? Image { get; set; }
    }
}
