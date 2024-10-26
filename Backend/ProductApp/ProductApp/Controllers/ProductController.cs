using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductApp.DataContracts;
using ProductApp.Models;
using ProductApp.Persistence;
using System.Linq;

namespace ProductApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private IHostEnvironment _hostingEnvironment;
        private readonly ApplicationDbContext _context;
        public ProductController(ApplicationDbContext context, IHostEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
        }
        [HttpPost]
        [Route("GetProductList")]
        [AllowAnonymous]
        public async Task<CommonResponse<List<ProductListDC>>> GetProductList(ProductListRequestDC request)
        {
            CommonResponse<List<ProductListDC>> commonResponse = new CommonResponse<List<ProductListDC>> { message = "Product Not Found!!!" };
            var products = _context.Products.Where(x => x.Title.Contains(request.keyword));
            int totalRecords = products.Count();
            commonResponse.response = products.Select(x => new ProductListDC
            {
                Date = x.Date,
                Description = x.Description,
                Price = x.Price,
                Quantity = x.Quantity,
                Title = x.Title,
                Image = x.Image,
                ProductId = x.Id,
                TotalRecords = totalRecords
            }).Skip(request.skip).Take(request.take).ToList();
            if (commonResponse.response != null && commonResponse.response.Any())
            {
                commonResponse.status = true;
                commonResponse.message = "Product Found";
            }
            return commonResponse;
        }

        [HttpPost]
        [Route("AddUpdateProducts")]
        [AllowAnonymous]
        public async Task<CommonResponse<bool>> AddUpdateProducts(List<AddProductRequestDC> request)
        {
            CommonResponse<bool> commonResponse = new CommonResponse<bool> { message = "Failed to update!!!" };
            foreach (var product in request)
            {
                _context.Products.Add(new Product
                {
                    Date = product.Date,
                    Description = product.Description,
                    Price = product.Price,
                    Quantity = product.Quantity,
                    Title = product.Title,
                    Image = product.Image
                });
            }
            if (await _context.SaveChangesAsync() > 0)
            {
                commonResponse.status = true;
                commonResponse.response = true;
                commonResponse.message = "Product Added Successfully";
            }
            return commonResponse;
        }


        [HttpPost]
        [Route("UploadFile")]
        [AllowAnonymous]
        public async Task<CommonResponse<string>> PostSingleFileLocal(FileUploadDTO fileDetails)
        {
            CommonResponse<string> response = new CommonResponse<string> { message = "File not uploaded." };
            if (fileDetails == null || fileDetails.FileDetails == null)
            {
                return response;
            }
            string ext = Path.GetExtension(fileDetails.FileDetails.FileName);
            string FileNameGuid = Guid.NewGuid().ToString();
            string envPath = "";
            string uploadFilePath = Path.Combine(_hostingEnvironment.ContentRootPath, "wwwroot", "Uploads");
            string returnFilePath = $"{envPath}/Uploads/{FileNameGuid}{ext}";


            if (!Directory.Exists(uploadFilePath))
            {
                Directory.CreateDirectory(uploadFilePath);
            }

            string filePath = Path.Combine(uploadFilePath, FileNameGuid + ext);
            using (Stream fileStream = new FileStream(filePath, FileMode.Create))
            {
                await fileDetails.FileDetails.CopyToAsync(fileStream);
            }
            response.response = returnFilePath;
            response.status = true;
            response.message = "File Uploaded";

            return response;

        }
    }
}
