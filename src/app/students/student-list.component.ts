import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { IStudent } from './student';
import { StudentService } from './student.service';
import { FormGroup, FormControl } from "@angular/forms";
import { MatTableDataSource } from '@angular/material/table';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentDialogComponent } from './add-student-dialog.component';

@Component({
  selector: 'ysms-students',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'regNo',
    'firstName',
    'secondName',
    'lastName',
    'gender',
  ];
  // ELEMENT_DATA: IStudent[] = [
  //   {studentId:1, regNo:'AMS/01', firstName:'Muhd', secondName:'Abdul', lastName:'Yola', gender:'male'},
  //   {studentId:2, regNo:'AMS/02', firstName:'Abbas', secondName:'Sani', lastName:'', gender:'male'},
  //   {studentId:3, regNo:'AMS/03', firstName:'Ahmad', secondName:'Sheikh', lastName:'Tijjani', gender:'male'}
  // ];
  data: IStudent[] = [];
  dataSource!: MatTableDataSource<IStudent>;
  // dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  filterValue: string = '';

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = true;
  sessionClassForm!: FormGroup;
  session!: string;
  studentClass!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private studentService: StudentService, public dialog: MatDialog) {}
  ngAfterViewInit() {
    
  }
  ngOnInit(): void {
    this.sessionClassForm = new FormGroup({
      session: new FormControl(),
      class: new FormControl()
    })
  }

  generateStudents(): void {
    this.session = this.sessionClassForm.get('session')?.value;
    this.studentClass = this.sessionClassForm.get('class')?.value;
    
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page).pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.studentService.getStudentByClass(this.session, this.studentClass, this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize)
              .pipe(catchError(() => observableOf(null)));
      }),
      map(data => {
        this.isLoadingResults = false;
        this.isRateLimitReached = data === null;
        if (data === null) {
          return []
        }
        this.resultsLength = data.totalStudents;
        return data.students;
      })
    ).subscribe(data => {
      this.data = data;
      this.dataSource = new MatTableDataSource(this.data);
    });
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  openAddStudentDialog() {
    this.dialog.open(AddStudentDialogComponent, { disableClose: true });
  }
}
