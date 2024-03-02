import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { TaskApiService } from './api/task.api.service';
import { TaskStatus, Task, TaskParams } from './api/types/task.types';
import { TaskComponent } from './components/task/task.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ToDo-Frontend';

  public todoTasks: Task[] = [];
  public startedTasks: Task[] = [];
  public completedTasks: Task[] = [];
  public params: TaskParams = {};
  constructor(private TaskApi: TaskApiService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  public getTasks() {
    this.TaskApi.getTasks(this.params).subscribe(res => {
      this.todoTasks = res.filter(task => task.status === 'todo');
      this.startedTasks = res.filter(task => task.status === 'started');
      this.completedTasks = res.filter(task => task.status === 'completed');
    });
  };

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
