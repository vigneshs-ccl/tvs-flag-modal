import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isAuthenticated', () => {
    it('should return false initially', () => {
      expect(service.isAuthenticated()).toBeFalse();
    });

    it('should return true after successful login', async () => {
      spyOn(service, 'loginWithMicrosoftSSO').and.returnValue(Promise.resolve(true));
      
      await service.loginWithMicrosoftSSO();
      
      expect(service.isAuthenticated()).toBeTrue();
    });
  });

  describe('loginWithMicrosoftSSO', () => {
    it('should return true on successful login', async () => {
      const result = await service.loginWithMicrosoftSSO();
      
      expect(result).toBeTrue();
      expect(service.isAuthenticated()).toBeTrue();
    });

    it('should handle login failure gracefully', async () => {
      // Mock localStorage to simulate failure
      spyOn(localStorage, 'getItem').and.throwError('Storage error');
      
      const result = await service.loginWithMicrosoftSSO();
      
      expect(result).toBeFalse();
    });

    it('should log error on failure', async () => {
      spyOn(console, 'error');
      spyOn(localStorage, 'getItem').and.throwError('Storage error');
      
      await service.loginWithMicrosoftSSO();
      
      expect(console.error).toHaveBeenCalledWith('Microsoft SSO login failed:', jasmine.any(Error));
    });
  });

  describe('logout', () => {
    it('should clear authentication state', () => {
      spyOn(localStorage, 'removeItem');
      
      service.logout();
      
      expect(service.isAuthenticated()).toBeFalse();
      expect(localStorage.removeItem).toHaveBeenCalledWith('auth_token');
      expect(localStorage.removeItem).toHaveBeenCalledWith('user_info');
    });

    it('should log logout message', () => {
      spyOn(console, 'log');
      
      service.logout();
      
      expect(console.log).toHaveBeenCalledWith('User logged out');
    });
  });

  describe('getAuthStatus', () => {
    it('should return observable of authentication status', (done) => {
      service.getAuthStatus().subscribe(status => {
        expect(typeof status).toBe('boolean');
        done();
      });
    });

    it('should emit authentication changes', (done) => {
      let callCount = 0;
      service.getAuthStatus().subscribe(status => {
        callCount++;
        if (callCount === 1) {
          expect(status).toBeFalse();
        } else if (callCount === 2) {
          expect(status).toBeTrue();
          done();
        }
      });

      // Trigger authentication change
      service['setAuthenticated'](true);
    });
  });

  describe('getUserInfo', () => {
    it('should return null when not authenticated', () => {
      expect(service.getUserInfo()).toBeNull();
    });

    it('should return user info when authenticated', () => {
      const mockUserInfo = { name: 'Test User', email: 'test@example.com' };
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUserInfo));
      spyOn(service, 'isAuthenticated').and.returnValue(true);
      
      const result = service.getUserInfo();
      
      expect(result).toEqual(mockUserInfo);
    });

    it('should return null when user info is not available', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      spyOn(service, 'isAuthenticated').and.returnValue(true);
      
      const result = service.getUserInfo();
      
      expect(result).toBeNull();
    });
  });

  describe('private methods', () => {
    it('should check auth status from localStorage on initialization', () => {
      spyOn(localStorage, 'getItem').and.returnValue('mock-token');
      
      const newService = new AuthService();
      
      expect(newService.isAuthenticated()).toBeTrue();
    });

    it('should set authenticated to false when no token', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      
      const newService = new AuthService();
      
      expect(newService.isAuthenticated()).toBeFalse();
    });
  });
});
