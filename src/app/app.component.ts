import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { TaskApiService } from './api/task.api.service';
import { TaskStatus, Task, TaskParams, CreateTaskBody } from './api/types/task.types';
import { TaskComponent } from './components/task/task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TaskComponent, FormComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ToDo-Frontend';

  public tasks: Task[] = [];
  public params: TaskParams = { sortBy: 'updatedAt', orderBy: 'desc', status: 'all' };
  public options: TaskStatus[] = ['completed', 'started', 'todo'];
  public formType: 'add' | 'edit' = 'add';
  public taskPayload: Task = {
    id: 0,
    title: '',
    description: '',
    status: 'todo',
  };
  constructor(private TaskApi: TaskApiService) {
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

  public createTask(payload: CreateTaskBody) {
    if (this.formType === 'edit') {
      this.update({ ...payload, id: this.taskPayload.id });
      this.formType = 'add';
      this.taskPayload = {
        id: 0,
        title: '',
        description: '',
        status: 'todo',
      };
      return;
    }
    this.TaskApi.createTask(payload).subscribe({
      complete: () => {
        alert('Task Created !!');
        this.getTasks();
      },
      error: error => {
        alert('Task creation failed !!');
      },
    });
  }

  public update(task: any) {
    if (task.updateComplete) {
      this.formType = 'edit';
      this.taskPayload = {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
      };
      return;
    }
    const payload = {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
    };

    this.TaskApi.updateTask(payload).subscribe({
      complete: () => {
        alert('Updation Successful !!')
        this.getTasks();
      },
      error: error => {
        console.log(error);
        alert('Updation Failed');
      },
    });
  }

  public delete(id: number) {
    this.TaskApi.deletedTask(id).subscribe({
      complete: () => {
        alert('Task Deleted !!');
        this.getTasks();
      },
      error: () => { alert('Error in deletion !!') },
    })
  }
}
