# Workflow Diagrams - Frontend

Visual diagrams for the TVSM-MHI Frontend development workflows and processes.

## 🔄 Pre-commit Workflow

```mermaid
graph TD
    A[Developer makes changes] --> B[git add .]
    B --> C[git commit -m "message"]
    C --> D[Pre-commit Hook Triggered]
    D --> E[ESLint --fix]
    E --> F{ESLint passes?}
    F -->|No| G[❌ Commit blocked - Fix lint errors]
    F -->|Yes| H[Prettier --write]
    H --> I{Prettier success?}
    I -->|No| J[❌ Commit blocked - Fix formatting]
    I -->|Yes| K[ng test --watch=false]
    K --> L{Tests pass?}
    L -->|No| M[❌ Commit blocked - Fix failing tests]
    L -->|Yes| N[✅ Commit allowed]
    N --> O[Commit-msg Hook]
    O --> P{Valid commit message?}
    P -->|No| Q[❌ Commit blocked - Fix message format]
    P -->|Yes| R[✅ Commit successful]
    
    G --> S[Fix code and retry]
    J --> S
    M --> S
    Q --> T[Fix message and retry]
    S --> C
    T --> C
```

## 📝 Commit Message Validation

```mermaid
graph TD
    A[Commit Message] --> B{Format: type(scope): description}
    B -->|Valid| C[Check Type]
    B -->|Invalid| D[❌ Rejected - Invalid format]
    
    C --> E{Type in allowed list?}
    E -->|Yes| F[Check Scope]
    E -->|No| G[❌ Rejected - Invalid type]
    
    F --> H{Scope appropriate?}
    H -->|Yes| I[Check Description]
    H -->|No| J[❌ Rejected - Invalid scope]
    
    I --> K{Description clear and concise?}
    K -->|Yes| L[✅ Commit accepted]
    K -->|No| M[❌ Rejected - Poor description]
    
    D --> N[Show help: docs/COMMIT_GUIDELINES.md]
    G --> N
    J --> N
    M --> N
```

## 🏗️ Project Architecture

```mermaid
graph TB
    subgraph "Frontend Application"
        A[app.ts - Root Component]
        B[app.routes.ts - Routing]
        C[app.config.ts - Configuration]
        
        subgraph "Core Module"
            D[AuthService]
            E[AuthGuard]
            F[LoginComponent]
        end
        
        subgraph "Shared Module"
            G[UI Components]
            H[Pipes & Directives]
            I[Utilities]
        end
        
        subgraph "Feature Modules"
            J[Admin Module]
            K[Coach Module]
            L[Employee Module]
        end
        
        subgraph "Layouts"
            M[AdminLayout]
            N[CoachLayout]
            O[EmployeeLayout]
        end
    end
    
    A --> B
    A --> C
    B --> D
    B --> E
    B --> F
    B --> J
    B --> K
    B --> L
    
    J --> M
    K --> N
    L --> O
    
    D --> F
    E --> J
    E --> K
    E --> L
```

## 🧪 Test Execution Flow

```mermaid
graph TD
    A[Test Command: npm test] --> B[Karma Test Runner]
    B --> C[Load Test Files]
    C --> D[Compile TypeScript]
    D --> E[Load Dependencies]
    E --> F[Execute Tests]
    
    F --> G[Component Tests]
    F --> H[Service Tests]
    F --> I[Guard Tests]
    
    G --> J{All Tests Pass?}
    H --> J
    I --> J
    
    J -->|Yes| K[✅ Test Suite Passed]
    J -->|No| L[❌ Test Suite Failed]
    
    L --> M[Show Failed Tests]
    M --> N[Fix Issues]
    N --> A
    
    K --> O[Generate Coverage Report]
    O --> P[Exit Successfully]
```

## 🔐 Authentication Flow

```mermaid
graph TD
    A[User visits protected route] --> B{AuthGuard checks authentication}
    B -->|Not authenticated| C[Redirect to /login]
    B -->|Authenticated| D[Allow access to route]
    
    C --> E[LoginComponent displayed]
    E --> F[User enters credentials]
    F --> G{Login method?}
    
    G -->|Email/Password| H[Validate form]
    G -->|Microsoft SSO| I[AuthService.loginWithMicrosoftSSO]
    
    H --> J{Valid credentials?}
    J -->|No| K[Show error message]
    J -->|Yes| L[Set authentication state]
    
    I --> M{SSO successful?}
    M -->|No| N[Show error message]
    M -->|Yes| L
    
    L --> O[Update AuthService state]
    O --> P[Redirect to intended route]
    
    K --> E
    N --> E
```

## 📦 Build Process

```mermaid
graph TD
    A[Build Command: npm run build] --> B[Angular CLI]
    B --> C[TypeScript Compilation]
    C --> D[SCSS Compilation]
    D --> E[Asset Processing]
    E --> F[Bundle Generation]
    
    F --> G[Initial Chunks]
    F --> H[Lazy Chunks]
    F --> I[Styles]
    F --> J[Assets]
    
    G --> K[Core Application Code]
    H --> L[Feature Modules]
    I --> M[Compiled CSS]
    J --> N[Images, Fonts, etc.]
    
    K --> O[Output to dist/frontend/]
    L --> O
    M --> O
    N --> O
    
    O --> P[Build Complete]
```

## 🔧 Development Server Flow

```mermaid
graph TD
    A[npm start] --> B[ng serve]
    B --> C[Start Development Server]
    C --> D[Watch File Changes]
    D --> E[Compile on Change]
    E --> F[Hot Reload Browser]
    
    F --> G[File Modified?]
    G -->|Yes| H[Detect Change Type]
    G -->|No| I[Continue Watching]
    
    H --> J{TypeScript File?}
    H --> K{SCSS File?}
    H --> L{HTML File?}
    
    J --> M[Recompile TypeScript]
    K --> N[Recompile SCSS]
    L --> O[Update Template]
    
    M --> P[Update Browser]
    N --> P
    O --> P
    
    P --> I
    I --> G
```

## 📋 Code Quality Pipeline

```mermaid
graph TD
    A[Code Changes] --> B[ESLint Check]
    B --> C{ESLint Issues?}
    C -->|Yes| D[Auto-fix Issues]
    C -->|No| E[Prettier Formatting]
    
    D --> F{All Issues Fixed?}
    F -->|No| G[❌ Manual Fix Required]
    F -->|Yes| E
    
    E --> H[Format Code]
    H --> I[Unit Tests]
    I --> J{All Tests Pass?}
    
    J -->|No| K[❌ Fix Failing Tests]
    J -->|Yes| L[Commit Message Check]
    
    L --> M{Valid Format?}
    M -->|No| N[❌ Fix Commit Message]
    M -->|Yes| O[✅ Code Quality Passed]
    
    G --> P[Developer fixes issues]
    K --> P
    N --> Q[Developer fixes message]
    P --> A
    Q --> A
```

## 🚀 Deployment Pipeline

```mermaid
graph TD
    A[Code Committed] --> B[Pre-commit Hooks Pass]
    B --> C[Push to Repository]
    C --> D[CI/CD Pipeline Triggered]
    
    D --> E[Install Dependencies]
    E --> F[Run Linting]
    F --> G[Run Tests]
    G --> H[Build Application]
    
    H --> I{Build Successful?}
    I -->|No| J[❌ Deployment Failed]
    I -->|Yes| K[Deploy to Staging]
    
    K --> L[Run E2E Tests]
    L --> M{E2E Tests Pass?}
    M -->|No| N[❌ Rollback Deployment]
    M -->|Yes| O[Deploy to Production]
    
    O --> P[✅ Deployment Complete]
    
    J --> Q[Fix Issues and Retry]
    N --> Q
    Q --> A
```

## 📊 Test Coverage Flow

```mermaid
graph TD
    A[Test Execution] --> B[Collect Coverage Data]
    B --> C[Analyze File Coverage]
    C --> D[Generate Coverage Report]
    
    D --> E[HTML Report]
    D --> F[LCOV Report]
    D --> G[Console Summary]
    
    E --> H[View in Browser]
    F --> I[CI/CD Integration]
    G --> J[Terminal Output]
    
    H --> K[Identify Uncovered Code]
    I --> L[Coverage Threshold Check]
    J --> M[Coverage Statistics]
    
    K --> N[Write Additional Tests]
    L --> O{Threshold Met?}
    M --> P[Coverage Percentage]
    
    O -->|No| Q[❌ Coverage Below Threshold]
    O -->|Yes| R[✅ Coverage Requirements Met]
    
    N --> A
    Q --> S[Improve Test Coverage]
    S --> A
```

## 🔄 Git Workflow

```mermaid
graph TD
    A[Developer starts work] --> B[Create feature branch]
    B --> C[Make changes]
    C --> D[Stage changes: git add .]
    D --> E[Commit: git commit -m "message"]
    E --> F[Pre-commit hooks run]
    F --> G{Hooks pass?}
    G -->|No| H[Fix issues and retry]
    G -->|Yes| I[Commit-msg validation]
    I --> J{Message valid?}
    J -->|No| K[Fix message and retry]
    J -->|Yes| L[Commit successful]
    
    L --> M[Push to remote]
    M --> N[Create Pull Request]
    N --> O[Code Review]
    O --> P{Approved?}
    P -->|No| Q[Address feedback]
    P -->|Yes| R[Merge to main]
    
    H --> C
    K --> E
    Q --> C
    R --> S[Deploy to production]
```

## 📈 Performance Monitoring

```mermaid
graph TD
    A[Application Running] --> B[Performance Metrics]
    B --> C[Bundle Size Analysis]
    B --> D[Runtime Performance]
    B --> E[User Experience Metrics]
    
    C --> F[Initial Load Time]
    C --> G[Lazy Loading Efficiency]
    C --> H[Asset Optimization]
    
    D --> I[Component Render Time]
    D --> J[Memory Usage]
    D --> K[API Response Time]
    
    E --> L[Page Load Speed]
    E --> M[User Interaction Response]
    E --> N[Error Rates]
    
    F --> O[Performance Dashboard]
    G --> O
    H --> O
    I --> O
    J --> O
    K --> O
    L --> O
    M --> O
    N --> O
    
    O --> P[Identify Bottlenecks]
    P --> Q[Optimize Performance]
    Q --> R[Monitor Improvements]
    R --> A
```
