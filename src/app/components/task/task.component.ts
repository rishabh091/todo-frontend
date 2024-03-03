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
  @Output() taskDelete = new EventEmitter<number>();

  public options: TaskStatus[] = ['completed', 'started', 'todo'];

  public update(updateComplete = false) {
    if (!this.task) return;
    this.taskChange.emit(Object.assign({}, { ...this.task, updateComplete }));
  }

  public delete() {
    if (!this.task) return;
    this.taskDelete.emit(this.task.id);
  }
}
