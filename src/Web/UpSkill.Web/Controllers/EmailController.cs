﻿namespace UpSkill.Web.Controllers
{
    using System;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using UpSkill.Services.Contracts.Email;
    using UpSkill.Web.Infrastructure.Extensions.Contracts;

    using static Common.GlobalConstants.ControllerRoutesConstants;
    using static Common.GlobalConstants.MessagesConstants;

    public class EmailController : ApiController
    {
        private readonly IEmailService emailService;
        private readonly INLogger nlog;

        public EmailController(
            IEmailService emailService,
            INLogger nlog)
        {
            this.emailService = emailService;
            this.nlog = nlog;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route(VerifyEmailRoute)]
        public async Task<IActionResult> VerifyEmail(string email, string token)
        {
            var result = await this.emailService.VerifyEmailAsync(email, token);

            if (result.Failure)
            {
                this.nlog.Error(" ", new Exception(email + token));

                return this.BadRequest(result.Error);
            }

            this.nlog.Info(string.Concat(email, token));

            return this.Ok(EmailConfirmed);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route(ResendEmailConfirmationLinkRoute)]
        public async Task<IActionResult> ResendEmailConfirmationLink(string email)
        {
            var origin = this.Request.Headers[HeaderOrigin];
            var host = this.Request.Host.Value;

            var result = await this.emailService.ResendEmailConfirmationLinkAsync(email, host, origin);

            if (result.Failure)
            {
                this.nlog.Error(email, new Exception(result.Failure.ToString()));

                return this.BadRequest(result.Error);
            }

            this.nlog.Info(email);

            return this.Ok();
        }
    }
}
