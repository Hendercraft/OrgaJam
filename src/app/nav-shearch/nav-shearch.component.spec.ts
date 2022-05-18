import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavShearchComponent } from './nav-shearch.component';

describe('NavShearchComponent', () => {
  let component: NavShearchComponent;
  let fixture: ComponentFixture<NavShearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavShearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavShearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
