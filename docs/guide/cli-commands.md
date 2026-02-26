# CLI Commands

## create-framework

The main command to scaffold a new project.

### Usage

```bash
npx create-framework [project-name] [options]
```

### Arguments

| Argument | Description |
|----------|-------------|
| `project-name` | Name of your project (creates a folder with this name) |

### Options

| Option | Description |
|--------|-------------|
| `--template <name>` | Skip prompt and use specified template |
| `--skip-install` | Don't run `pnpm install` after scaffolding |
| `--help` | Show help |
| `--version` | Show version |

### Examples

```bash
# Interactive mode (recommended)
npx create-framework my-app

# Specify template directly
npx create-framework my-crm --template crm

# Skip dependency installation
npx create-framework my-app --template landing-page --skip-install
```

### Available Templates

| Template ID | Name | Description |
|-------------|------|-------------|
| `landing-page` | Landing Page | Marketing page with email capture |
| `crm` | CRM | Contact management with notes & tags |
| `booking` | Booking | Appointment scheduling with SMS |
| `dashboard` | Dashboard | Analytics with charts & KPIs |
| `invoicing` | Invoicing | Invoice management with Stripe |

## After Scaffolding

The CLI creates a new folder with:

```
my-app/
├── src/
│   ├── components/
│   ├── lib/
│   └── ...
├── .env.example
├── package.json
├── README.md
└── ...
```

Next steps:

```bash
cd my-app
pnpm install   # if you used --skip-install
pnpm dev       # start development server
```
