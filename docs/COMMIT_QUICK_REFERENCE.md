# Commit Quick Reference - Frontend

Quick reference for commit message formats in the TVSM-MHI Frontend project.

## Format
```
<type>[optional scope]: <description>
```

## Common Types
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style
- `refactor` - Code refactoring
- `test` - Tests
- `chore` - Maintenance

## Common Scopes
- `auth` - Authentication
- `ui` - User interface
- `routing` - Navigation
- `services` - Angular services
- `guards` - Route guards
- `modules` - Feature modules
- `shared` - Shared components
- `styles` - CSS/SCSS
- `tests` - Test files
- `deps` - Dependencies
- `api` - API integration
- `components` - Angular components
- `forms` - Form handling
- `layout` - Layout components

## Examples

### Features
```bash
feat(auth): add Microsoft SSO login
feat(ui): create admin dashboard component
feat(routing): implement lazy loading for modules
```

### Fixes
```bash
fix(login): resolve form validation error
fix(services): handle API error responses
fix(styles): fix mobile responsive layout
```

### Documentation
```bash
docs(readme): update setup instructions
docs(api): add service documentation
docs(components): update component examples
```

### Style & Refactoring
```bash
style(components): improve button styling
refactor(services): extract common API logic
refactor(auth): simplify login flow
```

### Tests
```bash
test(login): add unit tests for validation
test(services): add integration tests
test(components): add component tests
```

### Maintenance
```bash
chore(deps): update Angular to v20.3.1
chore(config): update ESLint rules
chore(build): optimize webpack config
```

## Breaking Changes
Add `!` after type/scope:
```bash
feat(auth)!: change login API response format
fix(api)!: remove deprecated endpoints
```

## Pre-commit Checks
- ✅ ESLint passes
- ✅ Prettier formatting
- ✅ Unit tests pass

**Commits will be blocked if any check fails!**
