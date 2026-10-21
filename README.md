# Gignation: Job Board & Applicant Tracking

A full-stack job board where candidates build a profile, upload a CV and apply for roles, and admins post jobs and review applicants. It has an **ASP.NET Core 7** Web API built on Clean Architecture and CQRS, and a **React + Vite** front end. Users can comment on job posts in real time.

![.NET](https://img.shields.io/badge/.NET_7-512BD4?logo=dotnet&logoColor=white)
![C#](https://img.shields.io/badge/C%23-239120?logo=csharp&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?logo=redux&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

<!-- TODO: add 2–3 screenshots here, e.g. docs/screenshots/job-list.png, job-detail.png, admin-applicants.png -->

## Features

**Freelancers / candidates**
- Register and log in with JWT access tokens and refresh tokens
- Browse jobs with search, tags and infinite scroll (paginated API)
- Build a profile with work experience and education, plus a profile photo stored on Cloudinary
- Upload a CV and apply for jobs, then track them on an "Applied jobs" page
- Comment on job posts live, using SignalR

**Admins** (role-based authorisation)
- Create, edit and delete job postings
- See each job's applicants and drill into an applicant's profile and CV

## Architecture

```
backend/gignation/
├── API/             Controllers, SignalR ChatHub, auth/identity setup, middleware
├── Application/     CQRS commands & queries (MediatR), DTOs, AutoMapper profiles, FluentValidation
├── Domain/          Entities: AppUser, Job, JobApplicant, Resume, CoverLetter, Experience, Education, Comment, Photo
├── Infrastructure/  Cloudinary photo storage, current-user accessor
└── Persistence/     EF Core DbContext + migrations (PostgreSQL)

frontend/            React 18 + Vite, Redux Toolkit slices, MUI + Tailwind, Formik/Yup forms
```

- **CQRS with MediatR:** each use case (e.g. `Jobs/Command/Create`, `Jobs/Query/List`) is its own handler, which keeps controllers thin.
- **Result pattern + paging:** handlers return `Result<T>`, and list endpoints use `PagedList<T>` with paging headers.
- **ASP.NET Core Identity** with roles (`Admin`, `Freelancer`, `Company`), JWT bearer auth and refresh tokens.
- **Single deployable:** the React build is served from the API's `wwwroot` with a fallback controller. It's containerised with Docker and configured for Fly.io.

## Running locally

**Prerequisites:** .NET 7 SDK, Node 18+, PostgreSQL (or `docker run -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres`), and a free Cloudinary account.

### 1. API

```bash
cd backend/gignation/API

# Secrets are kept out of appsettings.json, so set them with user-secrets
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=localhost;Port=5432;Database=gignation;User Id=postgres;Password=postgres;"
dotnet user-secrets set "TokenKey" "<a long random string, 64+ characters>"
dotnet user-secrets set "cloudinary:CloudName" "<your-cloud-name>"
dotnet user-secrets set "cloudinary:ApiKey" "<your-api-key>"
dotnet user-secrets set "cloudinary:ApiSecret" "<your-api-secret>"

dotnet run    # applies EF migrations and seeds roles + a demo admin on start-up
```

### 2. Front end

```bash
cd frontend
npm install
echo "VITE_API_URL=http://localhost:4000/api" >  .env.development
echo "VITE_CHAT_URL=http://localhost:4000/chat" >> .env.development
npm run dev
```

The API runs on `http://localhost:4000` by default (see `launchSettings.json`). Log in as the seeded admin, `admin@gignation.dev` / `Pa$$w0rd`, to see the admin views.

## What I'd improve next

- [ ] Add unit tests for the Application layer handlers and validators
- [ ] Upgrade to .NET 8 LTS
- [ ] Email notifications when an application's status changes
- [ ] AI-assisted matching: score a candidate's CV against a job description using an LLM

## Author

**James Uguna**: [GitHub](https://github.com/jamesekene8)
