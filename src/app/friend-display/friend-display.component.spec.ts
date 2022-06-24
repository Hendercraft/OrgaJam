import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendDisplayComponent } from './friend-display.component';

describe('FriendDisplayComponent', () => {
  let component: FriendDisplayComponent;
  let fixture: ComponentFixture<FriendDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});