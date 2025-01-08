'use client';
import { createContext, ReactNode, useEffect, useState } from 'react';

// Todo 타입 정의
export type TodoType = {
  id: number;
  name: string;
  isCompleted: boolean;
  memo?: string;
  imageUrl?: string;
};

// TodoContext 상태, 함수 타입
type TodoContextType = {
  todoList: TodoType[];
  addTodo: (todo: string) => void;
  toggleTodoStatus: (todoId: number, todoStatus: boolean) => void;
  deleteTodo: (itemId: number) => void;
  updateTodo: (itemId: number, formData: FormData) => void;
};

// TodoContext 생성
export const TodoContext = createContext<TodoContextType>({
  todoList: [],
  addTodo: () => {},
  toggleTodoStatus: () => {},
  deleteTodo: () => {},
  updateTodo: () => {},
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

      const { data: todoList } = data;
      // 각 todo의 상세 정보를 가져오기
      todoList.map((todo: TodoType) => fetchTodoDetails(todo.id));
    } catch (err) {
      console.error('투두리스트 가져오기 문제 발생:', err);
    }
  };

  const fetchTodoDetails = async (itemId: number) => {
    try {
      const res = await fetch(`/api/getTodoDetails/${itemId}`);
      if (!res.ok) {
        throw new Error(`투두 itemId 불러오기 실패: ${itemId}`);
      }
      const data = await res.json();

      // console.log('data___', data);

      // 해당 todoId의 속성을 추가/업데이트
      setTodoList((prevList) =>
        prevList.map((todo) =>
          todo.id === itemId
            ? { ...todo, memo: data.memo, imageURL: data.imageURL }
            : todo
        )
      );
    } catch (error) {
      console.error('투두 itemId 불러오기 실패했습니다2 :', error);
    }
  };

  // Todo 데이터를 초기화(처음 렌더링에 실행)
  useEffect(() => {
    fetchTodoData();
  }, []);

  // 할 일 추가하기 _________________
  const addTodo = async (todo: string) => {
    // 공백일 경우 막기
    if (todo.trim() === '') {
      return alert('공백은 입력할 수 없습니다!');
    }
    const newTodo = {
      name: todo,
      // memo: 'memo',
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

  // 할 일 완료 상태 토글 변경 _________________
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

  // 할 일 삭제 _________________

  const deleteTodo = async (itemId: number) => {
    try {
      const res = await fetch(`/api/deleteTodo/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error('삭제 실패');

      const data = await res.json();
      console.log('data', data);

      setTodoList((prev) => prev.filter((todo) => todo.id !== itemId));

      return data;
    } catch (err) {
      console.error('할 일 삭제에 문제가 발생했습니다:', err);
    }
  };

  // 할 일 업데이트 _________________

  const updateTodo = async (itemId: number, formData: FormData) => {
    try {
      const res = await fetch(`/api/updateTodo/${itemId}`, {
        method: 'PATCH',
        body: formData, // FormData로 데이터 전송
      });

      if (!res.ok) {
        throw new Error('투두 업데이트 실패');
      }

      const updatedTodo = await res.json();

      setTodoList((prev) =>
        prev.map((todo) =>
          todo.id === updatedTodo.data.id ? updatedTodo.data : todo
        )
      );
    } catch (error) {
      console.error('투두 업데이트에 실패했습니다.', error);
      throw error;
    }
  };

  return (
    <TodoContext.Provider
      value={{ todoList, addTodo, toggleTodoStatus, deleteTodo, updateTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
