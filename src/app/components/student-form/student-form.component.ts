import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Student } from '../../models/student';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit, OnChanges {
  /*@Input() student: Student = {
    name: '', email: '', mobile: '', gender: '', age: 0, nationality: '',
    id: 0
  };*/
  @Input() student!: Student;
  @Input() submitButtonText = 'Save';
  @Output() formSubmit = new EventEmitter<Student>();
  form!: FormGroup;

  studentForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['student'] && changes['student'].currentValue) {
      if (this.student) {
        console.log('Updating form with student data:', this.student);
        this.studentForm.patchValue(this.student);
      }
    }
  }

  ngOnInit(): void {
    if (this.student) {
      this.studentForm.patchValue(this.student);
    }
  }

  initForm(): void {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      nationality: ['', Validators.required],
    });
  }

  goToStudents() {
    this.router.navigate(['/students']);
  }

  get f() { return this.studentForm.controls; }

 
  onSubmit(): void {
    this.submitted = true;


    if (this.studentForm.invalid) {
      return;
    }

    const productData: Student = {
      ...this.student, // Preserve the ID if it exists
      name: this.f['name'].value,
      email: this.f['email'].value,
      mobile: this.f['mobile'].value,
      gender: this.f['gender'].value,
      age: this.f['age'].value,
      nationality: this.f['nationality'].value
    };

    this.formSubmit.emit(productData);
  }

  onReset(): void {
    this.submitted = false;
    this.studentForm.reset();
    this.initForm();
  }
 
}
