import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMassagesComponent } from './admin-massages.component';

describe('AdminMassagesComponent', () => {
  let component: AdminMassagesComponent;
  let fixture: ComponentFixture<AdminMassagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMassagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMassagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
