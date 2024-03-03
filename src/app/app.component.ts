import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { TaskApiService } from './api/task.api.service';
import { TaskStatus, Task, TaskParams, CreateTaskBody } from './api/types/task.types';
import { TaskComponent } from './components/task/task.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TaskComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ToDo-Frontend';

  public tasks: Task[] = [];
  public params: TaskParams = { sortBy: 'updatedAt', orderBy: 'desc', status: 'all' };
  public options: TaskStatus[] = ['completed', 'started', 'todo'];
  public createTaskBody: CreateTaskBody = {
    title: '',
    description: '',
    status: 'todo',
  };
  public createForm: FormGroup;
  constructor(private TaskApi: TaskApiService, private fb: FormBuilder) {
    this.createForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['todo', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getTasks();
  }

  public getTasks() {
    const params = Object.assign({}, this.params);
    if (params.status === 'all') delete params.status;
    if (!params.search) delete params.search;
    this.TaskApi.getTasks(params).subscribe(res => {
      this.tasks = res;
    });
  };

  public createTask() {
    console.log(this.createForm)
    // this.TaskApi.createTask().subscribe({
    //   complete: () => {},
    //   error: error => {},
    // });
  }

  public update(task: any) {
    const payload = {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
    };

    this.TaskApi.updateTask(payload).subscribe({
      complete: () => {
        this.getTasks();
      },
      error: error => {
        console.log(error);
        alert('Updation Failed');
      },
    });
  }
}
