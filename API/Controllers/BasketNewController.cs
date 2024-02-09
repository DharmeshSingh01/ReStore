using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    
    public class BasketNewController :BaseAPIController
    {
        private readonly IBasketRepository _basket;

        public BasketNewController(IBasketRepository basket)
        {
            _basket = basket;
        }
        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var Cookies = Request.Cookies["buyerID"].ToString();
           var basket=  await _basket.GetBasketAsync(Cookies);
            if (basket == null) return BadRequest();
            return basket.MapBasketToDto();
            //return new BasketDto
            //{
            //    Id = basket.Id,
            //    BuyerId = basket.BuyerId,
            //    Items = basket.Items.Select(item => new BasketItemDto
            //    {
            //        ProductId = item.ProductId,
            //        Name = item.Product.Name,
            //        Price = item.Product.Price,
            //        PictureUrl = item.Product.PictureUrl,
            //        Type = item.Product.Type,
            //        Brand = item.Product.Brand,
            //        Quantity = item.Quantity
            //    }).ToList()
            //};
        }
        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId , int quantity)
        {
            if(productId < 0 || quantity < 0) return BadRequest();
            var buyerId = Request.Cookies["buyerId"] ?? string.Empty;
                var basket = await _basket.CreateBasketAsync(buyerId, productId, quantity);

            if (basket == null) return BadRequest();
            if (buyerId.IsNullOrEmpty()){
                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
                Response.Cookies.Append("buyerId", basket.BuyerId, cookieOptions);
            }
            //return StatusCode(201);
                return CreatedAtRoute("GetBasket", basket.MapBasketToDto());

        }
        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity = 1)
        {
           var result= await _basket.RemoveBasketItemAsync(GetBuyerId(),productId, quantity)>0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem removing item from the basket" });
        }
        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }
    }
}
