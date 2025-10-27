import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['loginWithMicrosoftSSO']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty email and password', () => {
    expect(component.email).toBe('');
    expect(component.password).toBe('');
    expect(component.isLoading).toBeFalse();
  });

  it('should call onLogin when form is submitted with valid data', () => {
    spyOn(component, 'onLogin');
    component.email = 'test@example.com';
    component.password = 'password123';

    component.onLogin();

    expect(component.onLogin).toHaveBeenCalled();
  });

  it('should call onMicrosoftLogin when Microsoft login button is clicked', () => {
    spyOn(component, 'onMicrosoftLogin');

    component.onMicrosoftLogin();

    expect(component.onMicrosoftLogin).toHaveBeenCalled();
  });

  it('should set isLoading to true during Microsoft login', async () => {
    mockAuthService.loginWithMicrosoftSSO.and.returnValue(Promise.resolve(true));

    component.onMicrosoftLogin();

    expect(component.isLoading).toBeTrue();
  });

  it('should handle Microsoft login success', async () => {
    mockAuthService.loginWithMicrosoftSSO.and.returnValue(Promise.resolve(true));

    await component.onMicrosoftLogin();

    expect(component.isLoading).toBeFalse();
  });

  it('should handle Microsoft login failure', (done) => {
    mockAuthService.loginWithMicrosoftSSO.and.returnValue(Promise.reject('Login failed'));
    spyOn(console, 'error');

    component.onMicrosoftLogin();

    // Wait for the async operation to complete
    setTimeout(() => {
      expect(component.isLoading).toBeFalse();
      expect(console.error).toHaveBeenCalledWith('Microsoft login failed:', 'Login failed');
      done();
    }, 100);
  });
});
