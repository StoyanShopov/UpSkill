namespace UpSkill.Web.Pages
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.RazorPages;

    public class Home : PageModel
    {
        public void OnGet()
        {
        }

        public void OnPost(string name)
        {
            var emailAddress = Request.Form["emailaddress"];
            
        }
    }
}
