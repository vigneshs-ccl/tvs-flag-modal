import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    const routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should return true when user is authenticated', () => {
      mockAuthService.isAuthenticated.and.returnValue(true);

      const result = guard.canActivate();

      expect(result).toBeTrue();
      expect(mockAuthService.isAuthenticated).toHaveBeenCalled();
    });

    it('should redirect to login when user is not authenticated', () => {
      const mockUrlTree = { toString: () => '/login' } as UrlTree;
      mockAuthService.isAuthenticated.and.returnValue(false);
      mockRouter.createUrlTree.and.returnValue(mockUrlTree);

      const result = guard.canActivate();

      expect(result).toBe(mockUrlTree);
      expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/login']);
      expect(mockAuthService.isAuthenticated).toHaveBeenCalled();
    });

    it('should handle async canActivate', async () => {
      mockAuthService.isAuthenticated.and.returnValue(true);

      const result = await guard.canActivate();

      expect(result).toBeTrue();
    });

    it('should handle async canActivate with redirect', async () => {
      const mockUrlTree = { toString: () => '/login' } as UrlTree;
      mockAuthService.isAuthenticated.and.returnValue(false);
      mockRouter.createUrlTree.and.returnValue(mockUrlTree);

      const result = await guard.canActivate();

      expect(result).toBe(mockUrlTree);
    });
  });

  describe('edge cases', () => {
    it('should handle undefined authentication status', () => {
      mockAuthService.isAuthenticated.and.returnValue(undefined as any);
      const mockUrlTree = { toString: () => '/login' } as UrlTree;
      mockRouter.createUrlTree.and.returnValue(mockUrlTree);

      const result = guard.canActivate();

      expect(result).toBe(mockUrlTree);
    });

    it('should handle null authentication status', () => {
      mockAuthService.isAuthenticated.and.returnValue(null as any);
      const mockUrlTree = { toString: () => '/login' } as UrlTree;
      mockRouter.createUrlTree.and.returnValue(mockUrlTree);

      const result = guard.canActivate();

      expect(result).toBe(mockUrlTree);
    });
  });
});
