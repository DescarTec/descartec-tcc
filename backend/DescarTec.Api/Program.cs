using DescarTec.Api.Config.Context;
using DescarTec.Api.Config.InjecaoDependencia;
using DescarTec.Api.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

string mySqlConnection = builder.Configuration.GetConnectionString("DefaultConnection");
const string myAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myAllowSpecificOrigins,
        policyBuilder =>
        {
            policyBuilder.WithOrigins("https://nicolasbuscarini.github.io");
        });
});

builder.Services.AddDbContextPool<MySqlContext>(options =>
    options.UseMySql(mySqlConnection, ServerVersion.AutoDetect(mySqlConnection)));

builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
    .AddEntityFrameworkStores<MySqlContext>()
    .AddDefaultTokenProviders();

builder.Services.AddControllers();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["JWT:ValidIssuer"],

            ValidateAudience = true,
            ValidAudience = builder.Configuration["JWT:ValidAudience"],

            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"])),

            ValidateLifetime = true
        };
    });

// Injecao de dependencias
ServicesIoc.Config(builder.Services);
RepositoryIoc.Config(builder.Services);

builder.Services.AddSwaggerGen(c => {
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Descartec", Version = "v1" });
    var securityScheme = new OpenApiSecurityScheme
    {
        Name = "Authorization",
        BearerFormat = "JWT",
        Description = "JWT Authorization header using the Bearer scheme.",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey
    };
    c.AddSecurityDefinition("Bearer", securityScheme);
    var securityRequirement = new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    };
    c.AddSecurityRequirement(securityRequirement);
});

WebApplication app = builder.Build();

// Configure the HTTP request pipeline.

app.UseDeveloperExceptionPage();
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "Descartec v1");
});

//app.UseHttpsRedirection();

app.UseRouting();

app.UseCors(p =>
{
    p.AllowAnyMethod();
    p.AllowAnyHeader();
    p.AllowAnyOrigin();
});

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();