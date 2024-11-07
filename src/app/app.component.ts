import {
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
  viewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddTodo, Todo } from './service/todos.model';
import { TodoService } from './service/todo.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { FormGroup } from '@angular/forms';
import { AddTodoComponent } from './components/add-todo/add-todo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ModalComponent, AddTodoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  protected todos = signal<Todo[]>([]);
  protected isFetchingTodos = signal<boolean>(false);
  protected errorFetchingTodos = signal<boolean>(false);
  protected showAddTodoModal = signal<boolean>(false);

  private readonly todoService = inject(TodoService);
  @ViewChild('modal') modalRef!: ModalComponent;
  title = 'Add Todo';

  ngOnInit(): void {
    this.fetchTodos();
  }

  public fetchTodos(): void {
    this.isFetchingTodos.set(true);
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todos.set(todos);
        this.isFetchingTodos.set(false);
      },
      error: () => {
        this.errorFetchingTodos.set(true);
        this.isFetchingTodos.set(false);
      },
    });
  }

  protected showAddTodoForm(): void {
    this.showAddTodoModal.set(true);
    if (this.modalRef) {
      this.modalRef?.openModal();
    }
  }

  protected onAddTodo(form: FormGroup) {
    const todo: AddTodo = {
      title: form.get('title')?.value ?? '',
      description: form.get('description')?.value ?? '',
      priority: form.get('priority')?.value ?? '',
      due_date: form.get('due_date')?.value ?? '',
    };
    this.todoService.addTodo(todo).subscribe({
      next: (newTodo) => {
        this.todos.set([...this.todos(), newTodo]);
        this.showAddTodoModal.set(false);
        this.modalRef?.closeModal();
      },
    });
  }
}
