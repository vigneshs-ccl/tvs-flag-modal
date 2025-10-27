# Project Structure - Frontend

Detailed guide to the TVSM-MHI Frontend project structure and development workflow.

## 📁 Directory Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/                    # Core functionality
│   │   │   ├── auth/
│   │   │   │   └── login/           # Login component
│   │   │   ├── guards/              # Route guards
│   │   │   └── services/            # Core services
│   │   ├── shared/                  # Reusable components
│   │   ├── modules/                 # Feature modules
│   │   │   ├── admin/               # Admin module (lazy-loaded)
│   │   │   ├── coach/               # Coach module (lazy-loaded)
│   │   │   └── employee/            # Employee module (lazy-loaded)
│   │   ├── layouts/                 # Layout components
│   │   ├── app.routes.ts            # Main routing configuration
│   │   ├── app.config.ts            # App configuration
│   │   └── app.ts                   # Root component
│   ├── styles.scss                  # Global styles
│   └── main.ts                      # Application entry point
├── docs/                            # Project documentation
├── .husky/                          # Git hooks
├── .vscode/                         # VS Code configuration
├── .eslintrc.json                   # ESLint configuration
├── .prettierrc                      # Prettier configuration
├── commitlint.config.js             # Commit message validation
├── angular.json                     # Angular CLI configuration
├── package.json                     # Dependencies and scripts
└── tsconfig.json                    # TypeScript configuration
```

## 🏗️ Architecture Overview

### Core Module
The `core` module contains essential functionality that is used throughout the application:

- **Authentication**: Login components and authentication logic
- **Guards**: Route protection and access control
- **Services**: Core business logic and API communication
- **Interceptors**: HTTP request/response handling (future)

### Shared Module
The `shared` module contains reusable components, directives, and pipes:

- **Components**: Common UI components (buttons, forms, modals)
- **Directives**: Custom Angular directives
- **Pipes**: Data transformation pipes
- **Utilities**: Helper functions and constants

### Feature Modules
Each feature module represents a specific business domain:

- **Admin Module**: Administrative functionality
- **Coach Module**: Coaching features and tools
- **Employee Module**: Employee-specific features

All feature modules are lazy-loaded to improve initial bundle size and performance.

### Layouts
Layout components provide consistent page structure:

- **AdminLayout**: Layout for admin pages
- **CoachLayout**: Layout for coach pages
- **EmployeeLayout**: Layout for employee pages

## 🔄 Development Workflow

### 1. Code Development
```bash
# Start development server
npm start

# Code changes are automatically reloaded
# Navigate to http://localhost:4200
```

### 2. Code Quality Checks
```bash
# Run linting
npm run lint

# Run formatting
npx prettier --write "src/**/*.{ts,html,scss}"

# Run tests
npm test
```

### 3. Pre-commit Validation
Before each commit, the following checks run automatically:

1. **ESLint**: Code style and quality validation
2. **Prettier**: Code formatting
3. **Unit Tests**: All tests must pass

### 4. Commit Process
```bash
# Stage changes
git add .

# Commit with conventional format
git commit -m "feat(auth): add Microsoft SSO login"

# Push to repository
git push
```

## 🧪 Testing Strategy

### Unit Tests
- **Framework**: Jasmine + Karma
- **Location**: `*.spec.ts` files alongside components
- **Coverage**: Enabled by default
- **Command**: `npm test`

### Test Structure
```typescript
describe('ComponentName', () => {
  let component: ComponentName;
  let fixture: ComponentFixture<ComponentName>;

  beforeEach(() => {
    // Setup
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle specific behavior', () => {
    // Test implementation
  });
});
```

### Running Tests
```bash
# Interactive mode (watch)
npm test

# CI mode (headless)
npm run test:ci

# Coverage report
npm run test -- --code-coverage
```

## 🔧 Configuration Files

### ESLint Configuration (`.eslintrc.json`)
- **Parser**: TypeScript
- **Rules**: Enforce semicolons, single quotes, max line length 120
- **Environment**: Browser, Node.js, Jasmine

### Prettier Configuration (`.prettierrc`)
- **Single Quotes**: Enabled
- **Semicolons**: Required
- **Print Width**: 120 characters
- **Angular HTML**: Special parser for Angular templates

### Angular Configuration (`angular.json`)
- **Build**: Production and development configurations
- **Serve**: Development server settings
- **Test**: Karma test runner configuration
- **Lint**: ESLint integration

### TypeScript Configuration (`tsconfig.json`)
- **Target**: ES2020
- **Module**: ES2020
- **Strict Mode**: Enabled
- **Angular**: Optimized for Angular development

## 🚀 Build Process

### Development Build
```bash
npm run build
# Output: dist/frontend/
```

### Production Build
```bash
npm run build --configuration=production
# Optimized bundle with minification
```

### Build Output
- **Initial Chunks**: Core application code
- **Lazy Chunks**: Feature modules loaded on demand
- **Assets**: Images, fonts, and other static files
- **Styles**: Compiled SCSS to CSS

## 📦 Package Management

### Dependencies
- **Angular**: Core framework and CLI
- **RxJS**: Reactive programming
- **Zone.js**: Change detection

### Dev Dependencies
- **TypeScript**: Type checking and compilation
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Jasmine + Karma**: Testing framework
- **Husky**: Git hooks
- **Commitlint**: Commit message validation

### Scripts
```json
{
  "start": "ng serve",
  "build": "ng build",
  "test": "ng test",
  "test:ci": "ng test --watch=false --browsers=ChromeHeadless",
  "lint": "ng lint"
}
```

## 🔒 Security Considerations

### Authentication
- **AuthGuard**: Protects routes requiring authentication
- **AuthService**: Handles authentication state and Microsoft SSO
- **Route Protection**: Automatic redirect to login for unauthenticated users

### Code Quality
- **ESLint**: Prevents common security issues
- **TypeScript**: Type safety and compile-time error checking
- **Pre-commit Hooks**: Ensure code quality before commits

## 📈 Performance Optimization

### Lazy Loading
- **Feature Modules**: Loaded on demand
- **Route-based**: Modules loaded when routes are accessed
- **Bundle Splitting**: Smaller initial bundle size

### Build Optimization
- **Tree Shaking**: Remove unused code
- **Minification**: Compress JavaScript and CSS
- **Asset Optimization**: Optimize images and fonts

## 🛠️ Development Tools

### VS Code Integration
- **Extensions**: Angular, TypeScript, ESLint, Prettier
- **Tasks**: Build, test, and lint tasks
- **Debugging**: Launch configurations for debugging

### Git Hooks
- **Pre-commit**: Code quality checks
- **Commit-msg**: Commit message validation
- **Automated**: No manual intervention required

## 📚 Best Practices

### Code Organization
- **Single Responsibility**: Each component/service has one purpose
- **Lazy Loading**: Feature modules loaded on demand
- **Shared Components**: Reusable UI components in shared module

### Testing
- **Unit Tests**: Test individual components and services
- **Mocking**: Use Jasmine spies for dependencies
- **Coverage**: Aim for high test coverage

### Git Workflow
- **Conventional Commits**: Use standard commit message format
- **Small Commits**: Make focused, atomic commits
- **Pre-commit Checks**: Let hooks validate code quality

## 🔄 Continuous Integration

### Pre-commit Checks
1. **ESLint**: Code style and quality
2. **Prettier**: Code formatting
3. **Unit Tests**: All tests must pass

### Commit Validation
- **Conventional Commits**: Enforced commit message format
- **Help URL**: References documentation for proper format

### Quality Gates
- **No Lint Errors**: Code must pass ESLint
- **All Tests Pass**: Unit tests must be successful
- **Proper Format**: Commits must follow conventional format
