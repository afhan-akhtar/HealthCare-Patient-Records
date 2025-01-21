using Microsoft.AspNetCore.Rewrite;
using Microsoft.AspNetCore.StaticFiles;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
});
var app = builder.Build();

var rewrite = new RewriteOptions();
//rewrite.AddIISUrlRewrite(builder.Environment.ContentRootFileProvider, "wwwroot/web.config");
//rewrite.AddApacheModRewrite(builder.Environment.ContentRootFileProvider, "wwwroot/.htaccess");

var provider = new FileExtensionContentTypeProvider();
provider.Mappings[".vue"] = "application/x-javascript";

app.UseRewriter(rewrite);
app.UseResponseCompression();
app.UseDefaultFiles();
app.UseStaticFiles(new StaticFileOptions
{
    ContentTypeProvider = provider
});

app.Run();
