import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student } from '../../models/student';
import { StudentService } from '../../service/student.service';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, Subject, catchError, finalize, of, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-get-all-students',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './get-all-students.component.html',
  styleUrl: './get-all-students.component.css',
  // Use Default change detection
  changeDetection: ChangeDetectionStrategy.Default
})
export class GetAllStudentsComponent implements OnInit, OnDestroy {
  // Data and UI state
  students: Student[] = [];
  loading = false;
  error: string | null = null;

  // Private subjects for managing data streams
  private refresh$ = new BehaviorSubject<boolean>(true);
  private destroy$ = new Subject<void>();
  
  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    // Set up the data stream with automatic refreshing
    this.refresh$
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => {
          this.loading = true;
          this.error = null;
          
          return this.studentService.getAllStudents().pipe(
            catchError(err => {
              console.error('Error loading students:', err);
              this.error = 'Failed to load students';
              return of([] as Student[]);
            }),
            finalize(() => {
              this.loading = false;
            })
          );
        })
      )
      .subscribe(students => {
        //console.log('Students loaded:', students.length);
        this.students = students;
      });
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Track function for ngFor optimization
  trackById(index: number, student: Student): number {
    return student.id;
  }
  
  // Refresh the student list
  refreshStudents(): void {
    this.refresh$.next(true);
  }

  // Delete a student and refresh the list
  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.loading = true;
      
      this.studentService.deleteStudent(id)
        .pipe(
          finalize(() => this.loading = false),
          catchError(err => {
            console.error('Failed to delete student:', err);
            this.error = 'Failed to delete student';
            return of(null);
          })
        )
        .subscribe(() => {
          console.log('Student deleted, ID:', id);
          this.refreshStudents();
        });
    }
  }
}