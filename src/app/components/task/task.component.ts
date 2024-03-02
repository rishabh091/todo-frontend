import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, TaskStatus } from '../../api/types/task.types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() task: Task | null = null;
  @Output() taskChange = new EventEmitter<Task>();

  public options: TaskStatus[] = ['completed', 'started', 'todo'];

  public update() {
    if (!this.task) return;
    this.taskChange.emit(Object.assign({}, this.task));
  }
}
