using AspNetCore.Identity.Mongo;
using Typescript.Core.Interface;
using Typescript.Data.Connection;
using Typescript.Identity.Models;
using Typescript.Service.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Mongo DB settings
builder.Services.Configure<AppDatabaseSettings>(builder.Configuration.GetSection("DatabaseSettings"));

try
{

    builder.Services.AddIdentityMongoDbProvider<ApplicationUser, ApplicationRole, string>(identityOptions =>
    {
        identityOptions.Password.RequireDigit = true;
        identityOptions.Password.RequiredLength = 6;
        identityOptions.Password.RequireNonAlphanumeric = false;
        identityOptions.Password.RequireUppercase = true;
        identityOptions.Password.RequireLowercase = true;
    }, 
    mongoIdentityOptions =>
    {
        mongoIdentityOptions.ConnectionString = builder.Configuration["mongodb://localhost:27017"];
    });
}
catch (Exception ex)
{
    // Log the exception (use your preferred logging framework)
    throw new InvalidOperationException("Could not configure Identity.", ex);
}

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
