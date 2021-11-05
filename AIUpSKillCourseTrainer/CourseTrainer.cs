namespace AIUpSKillCourseTrainer
{
    using System;

    using Microsoft.Azure.WebJobs;
    using Microsoft.Extensions.Logging;

    public static class CourseTrainer
    {
        [FunctionName("CourseTrainer")]
        public static void Run([TimerTrigger("0 0 10,22 * * *")]TimerInfo myTimer, ILogger log)
        {
            log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");
        }
    }
}
