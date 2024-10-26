namespace ProductApp.DataContracts
{
    public class ProductListDC
    {
        public int ProductId { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required int Quantity { get; set; }
        public required double Price { get; set; }
        public required DateTime Date { get; set; }
        public string? Image { get; set; }
        public int TotalRecords { get; set; }
    }
    
    public class CommonResponse<T>
    {
        public bool status { get; set; }
        public string message { get; set; }
        public T response { get; set; }
    }
}
