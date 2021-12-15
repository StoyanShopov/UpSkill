namespace UpSkill.Web.Views.Home
{
    using System.Net.Http;
    using System.Net.Http.Json;
    using System.Threading.Tasks;

    using AspNetCoreHero.ToastNotification.Abstractions;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.RazorPages;
    using UpSkill.Web.ViewModels.Owner;

    [IgnoreAntiforgeryToken(Order = 1001)]
    public class Index : PageModel
    {
        private HttpClient client;
        private readonly INotyfService notyf;

        public Index(HttpClient client, INotyfService notyf)
        {
            this.client = client;
            this.notyf = notyf;
        }

        public void OnGet()
        {
        }

        public async Task<IActionResult> OnPostAsync(string name, string company, string email, string phone)
        {
            if (string.IsNullOrWhiteSpace(name)
                || string.IsNullOrWhiteSpace(company)
                || string.IsNullOrWhiteSpace(email)
                || string.IsNullOrWhiteSpace(phone))
            {
                return this.BadRequest();
            }

            var url = "https://localhost:44319/Owner/Coaches/newCoach";
            var model = new RequestCoachModel { RequesterName = name, RequesterEmail = email, Description = company, Field = phone };

            var response = await this.client.PostAsJsonAsync(url, model);
            if (response.IsSuccessStatusCode)
            {
                this.notyf.Success("Your Demo has been requested!");
                return this.Redirect("/");
            }

            return this.BadRequest();
        }
    }
}
