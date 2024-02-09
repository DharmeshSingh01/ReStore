using API.Data;
using API.Entities;
using API.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;



namespace API.Repository
{
    public class BasketRepository : IBasketRepository
    {
        private readonly StoreContext _context;

        public BasketRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<Basket> CreateBasketAsync(string buyerId, int productId, int quantity)
        {
            if (buyerId.IsNullOrEmpty())
            {
                buyerId = Guid.NewGuid().ToString();
            }
            var product = await _context.Products.FindAsync(productId);
            var basket = await GetBasketAsync(buyerId);
            if (basket == null)
            {
                basket = new Basket { BuyerId = buyerId };

                _context.Baskets.Add(basket);
            }
            basket.AddItem(product, quantity);
            await _context.SaveChangesAsync();
            return basket;


        }

        public async Task<Basket> GetBasketAsync(string Cookies)
        {

            var basket = await _context.Baskets
                .Include(i => i.Items).ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Cookies);
            return basket;
        }

        public async Task<int> RemoveBasketItemAsync(string buyerId, int productId, int quantity)
        {
            var basket = await GetBasketAsync(buyerId);
            if (basket == null) return 0;
            basket.RemoveItem(productId, quantity);
            return await _context.SaveChangesAsync();
        }
    }
}
