using Domain;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Jobs
{
	public class JobValidator : AbstractValidator<Job>
	{
        public JobValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
			RuleFor(x => x.Description).NotEmpty().MinimumLength(50);
			RuleFor(x => x.Location).NotEmpty();
			RuleFor(x => x.JobType).NotEmpty();
			RuleFor(x => x.Salary).NotEmpty();
			RuleFor(x => x.CompanyName).NotEmpty();
			RuleFor(x => x.CompanySize).NotEmpty();
			RuleFor(x => x.CompanyType).NotEmpty();
		}
    }
}
