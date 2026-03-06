# Contributing to FrameWork

Thanks for your interest in contributing! Here's how to help.

## Ways to Contribute

### 1. Report Issues
Found a bug? [Open an issue](https://github.com/framework-hq/framework/issues/new) with:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Template name (if applicable)

### 2. Request Features
Want a new template or feature? Open an issue with:
- Use case description
- Why existing templates don't work
- Rough idea of implementation (optional)

### 3. Submit Pull Requests
Ready to code? Here's the process:

1. Fork the repo
2. Create a branch: `git checkout -b my-feature`
3. Make your changes
4. Test locally: `pnpm dev` in the template folder
5. Commit: `git commit -m "Add my feature"`
6. Push: `git push origin my-feature`
7. Open a PR

## Development Setup

```bash
git clone https://github.com/framework-hq/framework.git
cd framework
pnpm install

# Work on a specific template
cd templates/crm
pnpm dev
```

## Code Style

- **TypeScript** for all code
- **Tailwind CSS** for styling
- **Functional components** with hooks
- **Descriptive variable names** (no abbreviations)

## Template Structure

Each template should have:
```
templates/my-template/
├── README.md          # How to use this template
├── package.json       # Dependencies
├── .env.example       # Required env vars
├── src/
│   ├── app/           # Next.js pages (or routes)
│   ├── components/    # React components
│   └── lib/           # Utilities
└── public/            # Static assets
```

## Adding a New Template

1. Create folder in `templates/`
2. Copy structure from existing template
3. Build the core functionality
4. Add README with usage instructions
5. Add to main README template list
6. Submit PR

## Questions?

Open an issue or reach out at hello@getesgrow.com.

## License

By contributing, you agree your contributions will be MIT licensed.
