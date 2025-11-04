import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './core/guards/auth.guard';

describe('App Routes', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthGuard, useValue: { canActivate: () => true } }
      ]
    });
    router = TestBed.inject(Router);
  });

  it('should navigate to login by default', async () => {
    await router.navigate(['']);
    expect(router.url).toBe('/login');
  });

  it('should navigate to admin with auth guard', async () => {
    await router.navigate(['/admin']);
    expect(router.url).toBe('/admin');
  });

  it('should navigate to coach with auth guard', async () => {
    await router.navigate(['/coach']);
    expect(router.url).toBe('/coach');
  });

  it('should navigate to employee with auth guard', async () => {
    await router.navigate(['/employee']);
    expect(router.url).toBe('/employee');
  });

  it('should redirect unknown routes to login', async () => {
    await router.navigate(['/unknown-route']);
    expect(router.url).toBe('/login');
  });
});
