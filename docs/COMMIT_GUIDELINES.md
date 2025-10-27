# Commit Guidelines - Frontend

This document outlines the commit message conventions for the TVSM-MHI Frontend project.

## Conventional Commits

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification to ensure clear, consistent, and automated commit messages.

## Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | A new feature | `feat(auth): add Microsoft SSO login` |
| `fix` | A bug fix | `fix(login): resolve form validation issue` |
| `docs` | Documentation changes | `docs(readme): update setup instructions` |
| `style` | Code style changes (formatting, etc.) | `style(components): fix indentation` |
| `refactor` | Code refactoring | `refactor(auth): simplify login logic` |
| `test` | Adding or updating tests | `test(login): add unit tests for validation` |
| `chore` | Maintenance tasks | `chore(deps): update Angular to v20.3.0` |
| `perf` | Performance improvements | `perf(routing): optimize lazy loading` |
| `ci` | CI/CD changes | `ci(github): add automated testing workflow` |
| `build` | Build system changes | `build(webpack): update configuration` |

## Scopes

Common scopes for the frontend project:

- `auth` - Authentication related changes
- `ui` - User interface components
- `routing` - Navigation and routing
- `services` - Angular services
- `guards` - Route guards
- `modules` - Feature modules (admin, coach, employee)
- `shared` - Shared components and utilities
- `styles` - CSS/SCSS changes
- `tests` - Test files
- `deps` - Dependencies
- `config` - Configuration files
- `api` - API integration
- `components` - Angular components
- `forms` - Form handling
- `layout` - Layout components

## Examples

### Good Examples

```bash
feat(auth): add Microsoft SSO login component
fix(login): resolve form validation error on empty fields
docs(readme): update installation instructions
style(components): improve button hover effects
refactor(services): extract common API logic
test(login): add unit tests for form validation
chore(deps): update Angular to v20.3.1
perf(routing): implement lazy loading for admin module
```

### Bad Examples

```bash
# Too vague
fix: bug fix
update: changes
work: progress

# Missing type
add login form

# Wrong type
feat: fix bug in login
fix: add new feature
```

## Breaking Changes

Use `!` after the type/scope to indicate breaking changes:

```bash
feat(auth)!: change login API response format
fix(api)!: remove deprecated user endpoint
```

## Body and Footer

For complex changes, add a body to explain the what and why:

```bash
feat(auth): add role-based access control

Implement role-based access control system with three user roles:
- Admin: Full system access
- Coach: Limited access to coaching features
- Employee: Basic access to personal features

Closes #123
```

## Pre-commit Hooks

Before each commit, the following checks run automatically:

1. **ESLint** - Code style and quality checks
2. **Prettier** - Code formatting
3. **Unit Tests** - All tests must pass

**Important**: Commits will be blocked if any of these checks fail.

## Quick Reference

| Command | Description |
|---------|-------------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation |
| `style:` | Code style |
| `refactor:` | Code refactoring |
| `test:` | Tests |
| `chore:` | Maintenance |

## Resources

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
- [Semantic Versioning](https://semver.org/)
