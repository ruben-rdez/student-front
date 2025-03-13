import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllStudentsComponent } from './get-all-students.component';

describe('GetAllStudentsComponent', () => {
  let component: GetAllStudentsComponent;
  let fixture: ComponentFixture<GetAllStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllStudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
