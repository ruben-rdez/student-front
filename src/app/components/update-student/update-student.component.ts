import { Component, EventEmitter, Input, OnInit, OnChanges, Output } from '@angular/core';
import { Student } from '../../models/student';
import { StudentService } from '../../service/student.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentFormComponent } from '../student-form/student-form.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-update-student',
  standalone: true,
  imports: [CommonModule, RouterLink, StudentFormComponent],
  templateUrl: './update-student.component.html',
  styleUrl: './update-student.component.css'
})
export class UpdateStudentComponent implements OnInit {
  student: Student | null = null;
  loading = true;
  saving = false;
  error: string | null = null;

  constructor (
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

    ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.fetchStudent(id);
    } else {
      this.error = 'Invalid student ID';
      this.loading = false;
    }
  }

  fetchStudent(id: number): void {
    this.studentService.getStudentById(id)
      .subscribe({
        next: (data) => {
          this.student = { ...data };
          this.loading = false;
          this.cdRef.detectChanges();
        },
        error: (err) => {
          this.error = 'Failed to load student';
          this.loading = false;
          console.error(err);
        }
      });
  }

  updateStudent(studentData: Student): void {
    if (!this.student?.id) {
      this.error = 'Student ID is missing';
      return;
    }

    this.saving = true;
    this.error = null;
    this.studentService.updateStudent(this.student.id, studentData)
      .subscribe({
        next: (updatedStudent) => {
          this.saving = false;
          this.router.navigate(['/students']);
        },
        error: (err) => {
          this.error = 'Failed to update student: ' + (err.message || 'Unknown error');
          this.saving = false;
          console.error('Update student error:', err);
        }
      });
  }
}
