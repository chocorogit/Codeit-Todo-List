'use client';
import { createContext, ReactNode, useEffect, useState } from 'react';

// Todo 타입 정의
export type TodoType = {
  id: number;
  name: string;
  isCompleted: boolean;
};

// TodoContext 상태, 함수 타입
type TodoContextType = {
  todoList: TodoType[];
  addTodo: (todo: string) => void;
  toggleTodoStatus: (todoId: number, todoStatus: boolean) => void;
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
  const addTodo = async (todo: string) => {
    // 공백일 경우 막기
    if (todo.trim() === '') {
      return alert('공백은 입력할 수 없습니다!');
    }
    const newTodo = {
      // id: todoList.length + 1,
      name: todo,
      // isCompleted: false,
    };

    // API 요청 (서버에 할 일 추가)
    try {
      const res = await fetch('/api/addTodo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      const data = await res.json();

      // 새로운 Todo 추가 후 TodoList 상태에 저장
      setTodoList((prev) => [...prev, data.data]);

      console.log('할 일 추가 성공:', data);
    } catch (err) {
      console.error('투두리스트에 할 일 추가에 문제가 발생했습니다.', err);
    }
  };

  // 할 일 완료 상태 토글 변경
  const toggleTodoStatus = async (itemId: number, todoStatus: boolean) => {
    console.log('itemId', itemId);
    // 해당 Todo의 isCompleted 값을 변경 후 TodoList 상태에 저장
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === itemId ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );

    try {
      const res = await fetch(`/api/toggleTodoStatus/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isCompleted: !todoStatus }),
      });
      const data = await res.json();
      console.log('할 일 상태 변경 성공:', data);
    } catch (err) {
      console.error('상태 변경에 문제가 발생했습니다:', err);
    }
  };

  return (
    <TodoContext.Provider value={{ todoList, addTodo, toggleTodoStatus }}>
      {children}
    </TodoContext.Provider>
  );
};
