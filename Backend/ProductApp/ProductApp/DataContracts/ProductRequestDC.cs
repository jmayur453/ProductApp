namespace ProductApp.DataContracts
{
    public class ProductListRequestDC
    {
        public string keyword { get; set; }
        public int skip { get; set; }
        public int take { get; set; }
    }
    public class AddProductRequestDC
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public DateTime Date { get; set; }
        public string? Image { get; set; }
    }
    public class FileUploadDTO
    {
        public IFormFile FileDetails { get; set; }
    }
}
