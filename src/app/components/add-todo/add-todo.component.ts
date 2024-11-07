import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css',
})
export class AddTodoComponent {
  @Output() newTodo = new EventEmitter<FormGroup>();
  private _formBuilder = inject(FormBuilder);

  protected todoForm = this._formBuilder.group({
    title: [''],
    description: [''],
    priority: [''],
    due_date: [''],
  });

  public addTodo(): void {
    if (this.todoForm.valid) {
      this.newTodo.emit(this.todoForm);
    }
  }
}
