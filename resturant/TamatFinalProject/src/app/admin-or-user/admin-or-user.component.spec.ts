import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrUserComponent } from './admin-or-user.component';

describe('AdminOrUserComponent', () => {
  let component: AdminOrUserComponent;
  let fixture: ComponentFixture<AdminOrUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
