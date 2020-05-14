import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateDeptComponent } from './admin-update-dept.component';

describe('AdminUpdateDeptComponent', () => {
  let component: AdminUpdateDeptComponent;
  let fixture: ComponentFixture<AdminUpdateDeptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUpdateDeptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUpdateDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
