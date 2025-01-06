'use client';
import { createContext, ReactNode, useEffect, useState } from 'react';

// Todo 타입 정의
export type TodoType = {
  id: number;
  todo: string;
  isDone: boolean;
};

// TodoContext 상태, 함수 타입
type TodoContextType = {
  todoList: TodoType[];
  addTodo: (todo: string) => void;
  toggleTodoStatus: (todoId: number) => void;
};

// TodoContext 생성
export const TodoContext = createContext<TodoContextType>({
  todoList: [],
  addTodo: () => {},
  toggleTodoStatus: () => {},
});

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  // 투두리스트 상태 관리 (할 일 목록)
  const [todoList, setTodoList] = useState<TodoType[]>([]);

  // 투두리스트 데이터 가져오기
  const fetchTodoData = async () => {
    try {
      // API 요청
      const res = await fetch('/api/getTodoList');
      const data = await res.json();
      const { data: todos } = data;

      // console.log('가져온 todos는?', todos);

      // 가져온 Todo 데이터를 상태에 저장
      setTodoList(todos || []);
    } catch (err) {
      console.error('투두리스트 가져오기 문제 발생:', err);
    }
  };

  // Todo 데이터를 초기화(처음 렌더링에 실행)
  useEffect(() => {
    fetchTodoData();
  }, []);

  // 할 일 추가하기
  const addTodo = (todo: string) => {
    // 공백일 경우 막기
    if (todo.trim() === '') {
      return alert('공백은 입력할 수 없습니다!');
    }
    const newTodo = {
      id: todoList.length + 1,
      todo,
      isDone: false,
    };
    // 새로운 Todo 추가 후 TodoList 상태에 저장
    setTodoList((prev) => [...prev, newTodo]);

  // 할 일 완료 상태 토글 변경
  const toggleTodoStatus = (todoId: number) => {
    // 해당 Todo의 isDone 값을 변경 후 TodoList 상태에 저장
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  return (
    <TodoContext.Provider value={{ todoList, addTodo, toggleTodoStatus }}>
      {children}
    </TodoContext.Provider>
  );
};
