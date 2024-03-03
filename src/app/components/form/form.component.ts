import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CreateTaskBody, TaskStatus } from '../../api/types/task.types';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnChanges {
  @Input() form: CreateTaskBody = {
    title: '',
    description: '',
    status: 'todo',
  };
  @Output() createTask = new EventEmitter<CreateTaskBody>();
  public options: TaskStatus[] = ['completed', 'started', 'todo'];
  public createForm: FormGroup;
  public btnText: 'Submit' | 'Update' = 'Submit';

  constructor(private fb: FormBuilder) {
    this.createForm = this.fb.group({
      title: [this.form.title, [Validators.required]],
      description: [this.form.description, [Validators.required]],
      status: [this.form.status, [Validators.required]],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['form'] && this.form.title) {
      this.btnText = 'Update';
      this.createForm.patchValue({
        title: this.form.title,
        description: this.form.description,
        status: this.form.status,
      });
    }
  }

  create() {
    this.createTask.emit(this.createForm.value);
    this.createForm.reset();
  }
}
