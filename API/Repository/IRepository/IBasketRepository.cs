using API.Entities;

namespace API.Repository.IRepository
{
    public interface IBasketRepository
    {
        public Task<Basket> GetBasketAsync(string Cookies);
        public Task<Basket> CreateBasketAsync(string buyerId, int productId, int quantity);

        public Task <int> RemoveBasketItemAsync(string buyerId, int productId, int quantity);
    }
}
