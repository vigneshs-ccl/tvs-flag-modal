import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render admin dashboard title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Admin Dashboard');
  });

  it('should render placeholder content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('Welcome to the Admin module');
  });

  it('should have proper CSS classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.admin-container');
    expect(container).toBeTruthy();
  });

  it('should have proper styling structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const h1 = compiled.querySelector('h1');
    const p = compiled.querySelector('p');
    
    expect(h1).toBeTruthy();
    expect(p).toBeTruthy();
    expect(h1?.textContent).toBe('Admin Dashboard');
    expect(p?.textContent).toBe('Welcome to the Admin module. This is a placeholder component.');
  });
});
