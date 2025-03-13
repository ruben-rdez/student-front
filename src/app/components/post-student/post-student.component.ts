import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { StudentService } from '../../service/student.service';
import { Student } from '../../models/student';
import { StudentFormComponent } from '../student-form/student-form.component';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-student',
  standalone: true,
  imports: [CommonModule, RouterLink, StudentFormComponent, ReactiveFormsModule],
  templateUrl: './post-student.component.html',
  styleUrl: './post-student.component.css'
})
export class PostStudentComponent {
  error: string | null = null;
  loading = false;

  constructor(
    private studentService: StudentService, 
    private router: Router) { }

  createStudent(studentData: Student): void {
    this.loading = true;
    this.error = null;

    this.studentService.createStudent(studentData)
      .subscribe({
        next: (createdStudent) => {
          console.log('Record created successfully');
          //this.loading = false;
          //this.router.navigate(['students', createdStudent.id]);
          this.router.navigate(['/students']);
        },
        error: (err) => {
          this.error = 'Failed to create student: ' + (err.error.message || 'Unknown error');
          this.loading = false;
          console.error('Create student error:', err);
        }
      });

  }
}
