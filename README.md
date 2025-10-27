# TVSM-MHI Frontend

Angular frontend application for the TVSM-MHI project with role-based authentication and modular architecture.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Setup Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm start
   # or
   ng serve
   ```

3. **Open your browser:**
   Navigate to `http://localhost:4200/`

The application will automatically reload when you make changes to the source files.

## 🏗️ Project Structure

```
src/app/
├── core/                    # Core functionality
│   ├── auth/               # Authentication components
│   │   └── login/          # Login component
│   ├── guards/             # Route guards
│   └── services/           # Core services (AuthService)
├── shared/                 # Reusable UI components
├── modules/                # Feature modules
│   ├── admin/              # Admin module (lazy-loaded)
│   ├── coach/              # Coach module (lazy-loaded)
│   └── employee/           # Employee module (lazy-loaded)
└── layouts/                # Layout components
```

## 🧪 Testing

### Running Tests

```bash
# Run unit tests
npm test
# or
ng test

# Run tests in CI mode (headless)
npm run test:ci
```

### Test Configuration
- **Framework:** Jasmine + Karma
- **Coverage:** Enabled by default
- **Watch Mode:** Tests run in watch mode during development

## 🔧 Development

### Code Quality

The project uses ESLint and Prettier for code quality and formatting:

```bash
# Run linting
npm run lint
# or
ng lint
```

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run test:ci` - Run tests in CI mode
- `npm run lint` - Run ESLint
- `ng generate component <name>` - Generate new component

## 🔐 Authentication

The application includes:
- **AuthService** - Handles authentication logic
- **AuthGuard** - Protects routes requiring authentication
- **LoginComponent** - Microsoft SSO login interface
- **Role-based routing** - Admin, Coach, and Employee modules

### Authentication Flow
1. Unauthenticated users are redirected to `/login`
2. Login component supports both email/password and Microsoft SSO
3. Authenticated users can access role-specific modules
4. All protected routes are guarded by `AuthGuard`

## 📝 Commit Guidelines

This project follows conventional commit standards. All commits are validated before being accepted.

### Commit Rules
- **Format:** `type(scope): description`
- **Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- **Examples:**
  - `feat(auth): add Microsoft SSO login`
  - `fix(login): resolve form validation issue`
  - `docs(readme): update setup instructions`

### Pre-commit Hooks
Before each commit, the following checks run automatically:
- ESLint fixes code style issues
- Prettier formats code
- Unit tests must pass

**Note:** Commits will be blocked if linting fails or tests don't pass.

For detailed commit guidelines, see `../docs/COMMIT_GUIDELINES.md`.

## 🛠️ Technology Stack

- **Angular 20** - Frontend framework
- **TypeScript** - Programming language
- **SCSS** - Styling
- **RxJS** - Reactive programming
- **Jasmine + Karma** - Testing
- **ESLint + Prettier** - Code quality
- **Husky + lint-staged** - Git hooks

## 📚 Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI Reference](https://angular.dev/tools/cli)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
