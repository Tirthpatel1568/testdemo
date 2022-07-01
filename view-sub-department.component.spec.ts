import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubDepartmentComponent } from './view-sub-department.component';

describe('ViewSubDepartmentComponent', () => {
  let component: ViewSubDepartmentComponent;
  let fixture: ComponentFixture<ViewSubDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
