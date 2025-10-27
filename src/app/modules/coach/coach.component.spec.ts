import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoachComponent } from './coach.component';

describe('CoachComponent', () => {
  let component: CoachComponent;
  let fixture: ComponentFixture<CoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render coach dashboard title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Coach Dashboard');
  });

  it('should render placeholder content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('Welcome to the Coach module');
  });

  it('should have proper CSS classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.coach-container');
    expect(container).toBeTruthy();
  });

  it('should have proper styling structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const h1 = compiled.querySelector('h1');
    const p = compiled.querySelector('p');
    
    expect(h1).toBeTruthy();
    expect(p).toBeTruthy();
    expect(h1?.textContent).toBe('Coach Dashboard');
    expect(p?.textContent).toBe('Welcome to the Coach module. This is a placeholder component.');
  });
});
