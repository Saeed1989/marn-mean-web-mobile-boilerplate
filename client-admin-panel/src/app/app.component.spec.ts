import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { ShellComponent } from './shell/shell.component';

describe('AppComponent', () => {
  let mockStore;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj(['select']);
    mockStore.select = ()=> of(false);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [{ provide: Store, useValue: mockStore }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'client-admin-panel'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('client-admin-panel');
  });

  it('should render app shell', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const appShell = fixture.debugElement.queryAll(
      By.directive(ShellComponent)
    );
    expect(appShell).toBeTruthy();
  });
});
