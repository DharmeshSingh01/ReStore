using API.Data;
using API.Middleware;
using API.Repository;
using API.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using Newtonsoft;
using System.Text.Json.Serialization;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddDbContext<StoreContext>(opt =>
        {
            opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultDbConnection"));
            //.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
        });

        builder.Services.AddCors();
        builder.Services.AddScoped<IProductRepository, ProductRepository>();
        builder.Services.AddScoped<IBasketRepository, BasketRepository>();
        //       builder.Services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull);
        builder.Services.AddControllers().AddNewtonsoftJson(x =>
 x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

        var app = builder.Build();
        app.UseMiddleware<ExceptionMiddleware>();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        app.UseCors(opt =>
        {
            opt.AllowAnyHeader().AllowCredentials().AllowAnyMethod().WithOrigins("http://localhost:3000");
        });
        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        var scope = app.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        try
        {
            context.Database.Migrate();
            DbInitilizer.Initilizer(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error while migrate Data Base");
        }

        app.Run();
    }
}