export type Todo = {
  title: string;
  description: string;
  priority: number;
  due_date: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
};

export type AddTodo = {
  title: string;
  description: string;
  priority: number;
  due_date: string;
};
