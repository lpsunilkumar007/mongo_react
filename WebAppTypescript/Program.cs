using Microsoft.AspNetCore.Identity;
using Typescript.Core.Interface;
using Typescript.Data.Connection;
using Typescript.Identity.Interface;
using Typescript.Identity.Models;
using Typescript.Identity.Repositories;
using Typescript.Service.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Mongo DB settings
builder.Services.Configure<AppDatabaseSettings>(builder.Configuration.GetSection("DatabaseSettings"));

#region Identity
var mongoDbSettings = builder.Configuration.GetSection(nameof(MongoDbConfig)).Get<MongoDbConfig>();
builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
       .AddMongoDbStores<ApplicationUser, ApplicationRole, string>(
mongoDbSettings.ConnectionString, mongoDbSettings.Name
).AddDefaultTokenProviders();
#endregion

builder.Services.AddOpenApiDocument();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseOpenApi();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

