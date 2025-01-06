'use client';
import { createContext, ReactNode, useState } from 'react';

export type TodoType = {
  id: number;
  todo: string;
  isDone: boolean;
};

type TodoContextType = {
  todoList: TodoType[];
  addTodo: (todo: string) => void;
};

export const TodoContext = createContext<TodoContextType>({
  todoList: [],
  addTodo: () => {},
});

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  // const [todoList, setTodoList] = useState<TodoType[] | []>([
  //  { id: 1, todo: 'todo1', isDone: false },
  // ]);
  const [todoList, setTodoList] = useState<TodoType[]>([]);

  const addTodo = (todo: string) => {
    if (todo.trim() === '') {
      return alert('공백은 입력할 수 없습니다!');
    }
    const newTodo = {
      id: todoList.length + 1,
      todo,
      isDone: false,
    };
    setTodoList((prevTodo) => [...prevTodo, newTodo]);
  };

  return (
    <TodoContext.Provider value={{ todoList, addTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
