import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TaskParams, Task, CreateTaskBody } from './types/task.types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
  private apiUrl = environment.appUrl;

  constructor(private http: HttpClient) { }

  public getTasks(params: TaskParams) {
    return this.http.get(this.apiUrl + '/', { params: (params as any) }) as Observable<Task[]>;
  }

  public updateTask(body: Task) {
    return this.http.put(this.apiUrl + '/', body) as Observable<Task>;
  }

  public createTask(body: CreateTaskBody) {
    return this.http.post(this.apiUrl + '/', body) as Observable<Task>;
  }

  public deletedTask(id: number) {
    return this.http.delete(this.apiUrl + '/', { params: { id } });
  }
}
