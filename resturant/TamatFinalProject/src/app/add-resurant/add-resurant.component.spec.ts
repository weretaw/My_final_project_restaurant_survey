import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResurantComponent } from './add-resurant.component';

describe('AddResurantComponent', () => {
  let component: AddResurantComponent;
  let fixture: ComponentFixture<AddResurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddResurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
