import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
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

  createStudent(student: IStudent): Observable<HttpResponse<IStudent>> {
    const myheaders = new HttpHeaders({ 'Content-Type': 'application/json'})
    return this.http.post<HttpResponse<IStudent>>(`${this.rootUrl}students`, student, { headers: myheaders }).pipe(
      tap(data => console.log('Created Student: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  // Error handler function
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code ${err.status}, error message is ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
