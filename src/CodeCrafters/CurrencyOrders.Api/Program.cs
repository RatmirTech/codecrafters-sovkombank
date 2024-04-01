using CurrencyOrders.Api.Abstractions;
using CurrencyOrders.Api.Data;
using CurrencyOrders.Api.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContextFactory<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("CurrencyOrdersDb")));

builder.Services.AddHttpClient();
builder.Services.AddScoped<ICentralBankService, CentralBankService>();
builder.Services.AddScoped<ICurrencyRateService, CurrencyRateService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    var xmlFilename = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));

    options.SwaggerDoc("v1", new OpenApiInfo { Title = "Currency Orders API", Version = "v1" });
});

var app = builder.Build();

app.UseCors("AllowAll");
app.UseAuthentication();
app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthorization();

app.MapControllers();

app.Run();