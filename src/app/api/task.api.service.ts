import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TaskParams, Task } from './types/task.types';
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
}
