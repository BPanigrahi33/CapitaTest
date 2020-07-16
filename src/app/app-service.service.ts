import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { TaskDTO, Task } from 'src/app/taskModel';
import { catchError } from 'rxjs/internal/operators/catchError';


@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http: HttpClient) {
  }

  getTaskDetails(): Observable<Task[]> {
    let test: any; 
    return this.http.get<Task[]>("https://tasksmanager-302f5.firebaseio.com/Task.json")
    .pipe(
      catchError(this.handleError)
    );
  }

  doTaskUpdate(name: string, taskData: Task): Observable<TaskDTO[]> { 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    const options = { headers };
    const url = "https://tasksmanager-302f5.firebaseio.com/Task/" + name +".json";
    return this.http.put<TaskDTO[]>(url, taskData, options)
    .pipe(
      catchError(this.handleError)
    );
  }

  doTaskDelete(name: any) { 
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }),};
    const url = "https://tasksmanager-302f5.firebaseio.com/Task/" + name +".json";
    return this.http.delete(url, options);
  }

  doTaskInsert(taskData: Task): Observable<TaskDTO[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    const options = { headers };
    const url = "https://tasksmanager-302f5.firebaseio.com/Task.json";
    return this.http.post<TaskDTO[]>(url, taskData, options)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
