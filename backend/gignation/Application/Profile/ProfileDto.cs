using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profile
{
    public class ProfileDto
    {
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string Title { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Bio { get; set; }
        public int YearsOfExperience { get; set; }
        public string Linkdln { get; set; }
        public string Github { get; set; }
        public string Twitter { get; set; }
        public string profilePhoto { get; set; }
        public bool Remote { get; set; } = true;
        public string DesiredSalary { get; set; }
        public string DesiredRole { get; set; }
        public string DesiredLocation { get; set; }
        public Domain.Resume Resume { get; set; }
        public ICollection<Domain.Education> Educations { get; set; } = new List<Domain.Education>();
        public ICollection<Domain.Experience> Experiences { get; set; } = new List<Domain.Experience>();

    }
}
