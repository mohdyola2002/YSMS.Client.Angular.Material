import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { IStudent, IStudents } from './student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private rootUrl = 'https://localhost:44335/api/';

  constructor(private http: HttpClient) { }

  // GET Students
  getStudents(
    sort = '',
    order = '',
    page = 0,
    pageSize = 10
  ): Observable<IStudents> {
    return this.http
      .get<IStudents>(
        `${this.rootUrl}students?sort=${sort}&order=${order}&page=${page + 1
        }&pageSize=${pageSize}`
      )
      .pipe(
        tap((data) => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  // GET Students by Class and Session
  getStudentByClass(session: string, studClass: string, sort = '', order = '', page = 0, pageSize = 10): Observable<IStudents> {
    return this.http
      .get<IStudents>(
        `${this.rootUrl + session}/${studClass}?sort=${sort}&order=${order}&page=${page + 1}&pageSize=${pageSize}`
      )
      .pipe(
        tap((data) => console.log('By Class/Session: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createStudent(student: IStudent): Observable<IStudent> {
    const myheaders = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post<IStudent>(`${this.rootUrl}students`, student, { headers: myheaders }).pipe(
      tap(data => console.log('Created Student: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  insertStudentToClass(session: string, className: string, regNos: string[]): Observable<IStudents> {
    const myheaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IStudents>(`${this.rootUrl}/${session}/${className}`, regNos, { headers: myheaders }).pipe(
      tap(data => console.log('Students In class: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  // Error handler function
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code ${err.status}, error message is ${err.error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
