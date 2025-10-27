# Frontend Documentation

Documentation for the TVSM-MHI Frontend project.

## 📚 Available Documentation

### Development
- [Commit Guidelines](COMMIT_GUIDELINES.md) - Detailed commit message conventions
- [Commit Quick Reference](COMMIT_QUICK_REFERENCE.md) - Quick reference for commit formats

### Project Structure
- [Project Structure](PROJECT_STRUCTURE.md) - Detailed project architecture and workflow
- [Workflow Diagrams](WORKFLOW_DIAGRAMS.md) - Visual diagrams for development workflows

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm start
   ```

3. **Run tests:**
   ```bash
   npm test
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🔧 Development Workflow

### Code Quality
- **ESLint**: Code linting and style checks
- **Prettier**: Automatic code formatting
- **Husky**: Git hooks for pre-commit checks
- **Commitlint**: Commit message validation

### Testing
- **Jasmine + Karma**: Unit testing framework
- **Coverage**: Test coverage reporting enabled
- **CI Mode**: Headless testing for continuous integration

### Git Hooks
- **Pre-commit**: Runs linting, formatting, and tests
- **Commit-msg**: Validates commit message format

## 📝 Commit Guidelines

This project follows conventional commit standards. All commits are validated before being accepted.

### Quick Reference
- **Format**: `type(scope): description`
- **Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- **Examples**:
  - `feat(auth): add Microsoft SSO login`
  - `fix(login): resolve form validation issue`
  - `docs(readme): update setup instructions`

### Pre-commit Hooks
Before each commit, the following checks run automatically:
- ESLint fixes code style issues
- Prettier formats code
- Unit tests must pass

**Note**: Commits will be blocked if linting fails or tests don't pass.

## 🏗️ Project Architecture

### Core Structure
```
src/app/
├── core/                    # Core functionality
│   ├── auth/               # Authentication components
│   ├── guards/             # Route guards
│   └── services/           # Core services
├── shared/                 # Reusable UI components
├── modules/                # Feature modules
│   ├── admin/              # Admin module (lazy-loaded)
│   ├── coach/              # Coach module (lazy-loaded)
│   └── employee/           # Employee module (lazy-loaded)
└── layouts/                # Layout components
```

### Technology Stack
- **Angular 20** - Frontend framework
- **TypeScript** - Programming language
- **SCSS** - Styling
- **RxJS** - Reactive programming
- **Jasmine + Karma** - Testing
- **ESLint + Prettier** - Code quality
- **Husky + lint-staged** - Git hooks

## 📚 Additional Resources

- [Angular Documentation](https://angular.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Conventional Commits](https://www.conventionalcommits.org/)
