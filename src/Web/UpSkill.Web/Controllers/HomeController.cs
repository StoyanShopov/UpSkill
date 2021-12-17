namespace UpSkill.Web.Controllers
{
    using System;

    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Localization;
    using Microsoft.AspNetCore.Mvc;

    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            if (this.User != null)
            {
                return this.Redirect("/Courses");
            }

            return this.View();
        }

        [HttpPost]
        public IActionResult CultureManagement(string culture)
        {
            this.Response.Cookies
                .Append(
                    CookieRequestCultureProvider.DefaultCookieName,
                    CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(culture)),
                    new CookieOptions
                    {
                        Expires = DateTimeOffset.Now.AddDays(30),
                    });

            return this.RedirectToAction(nameof(this.Index));
        }
    }
}
