import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeComponent } from './employee.component';

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render employee dashboard title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Employee Dashboard');
  });

  it('should render placeholder content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('Welcome to the Employee module');
  });

  it('should have proper CSS classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.employee-container');
    expect(container).toBeTruthy();
  });

  it('should have proper styling structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const h1 = compiled.querySelector('h1');
    const p = compiled.querySelector('p');
    
    expect(h1).toBeTruthy();
    expect(p).toBeTruthy();
    expect(h1?.textContent).toBe('Employee Dashboard');
    expect(p?.textContent).toBe('Welcome to the Employee module. This is a placeholder component.');
  });
});
