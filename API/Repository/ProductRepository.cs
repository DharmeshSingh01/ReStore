using API.Data;
using API.Entities;
using API.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreContext _storeContext;

        public ProductRepository(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }
        public async Task<Product> GetProductByIdAsync(int id)
        {
            var product= await _storeContext.Products.Where(x=>x.Id == id).FirstOrDefaultAsync();
            return product;
        }

        public async Task<List<Product>> GetProductsAsync()
        {
           return await _storeContext.Products.ToListAsync();
        }
    }
}
