namespace UpSkill.Services.Data.Contracts.Owner
{
    using System.Threading.Tasks;

    using UpSkill.Web.ViewModels.Course;
    using UpSkill.Web.ViewModels.Owner;

    public interface IOwnerCoursesService
    {
        Task RequestCourseAsync(RequestCourseViewModel model);

        Task GetAll(GetOwnerAndCompanyByIdViewModel viewModel);
    }
}
