import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsCardComponent } from './friends-card.component';

describe('FriendsCardComponent', () => {
  let component: FriendsCardComponent;
  let fixture: ComponentFixture<FriendsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
