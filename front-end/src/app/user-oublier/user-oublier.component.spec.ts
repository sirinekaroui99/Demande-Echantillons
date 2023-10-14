import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOublierComponent } from './user-oublier.component';

describe('UserOublierComponent', () => {
  let component: UserOublierComponent;
  let fixture: ComponentFixture<UserOublierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOublierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOublierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
