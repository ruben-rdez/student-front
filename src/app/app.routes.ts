import { Routes } from '@angular/router';
import { GetAllStudentsComponent } from './components/get-all-students/get-all-students.component';
import { PostStudentComponent } from './components/post-student/post-student.component';
import { UpdateStudentComponent } from './components/update-student/update-student.component';

export const routes: Routes = [
    { path: '', redirectTo: 'students', pathMatch: 'full' },
    { path: 'students', component: GetAllStudentsComponent },
    { path: 'students/new', component: PostStudentComponent },
    { path: 'students/edit/:id', component: UpdateStudentComponent }
];
