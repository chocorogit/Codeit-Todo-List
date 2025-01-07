'use client';
import Image from 'next/image';
import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import Todo from './Todo';

export default function TodoList() {
  const { todoList } = useContext(TodoContext);
  const incompleteTodoList = todoList.filter(
    (todo) => todo.isCompleted === false
  );
  return (
    <div className={'w-full mb-12 laptop:mb-0'}>
      <Image
        className={'mb-4'}
        src={'/images/todo.svg'}
        width={101}
        height={36}
        alt={'todo-title-image'}
      />
      <div className={'flex flex-col items-center w-full h-full text-slate'}>
        {todoList.length > 0 ? (
          // <div>
          //   {todoList.map((todo) => (
          //     <div key={todo.id}>{todo.todo}</div>
          //   ))}
          // </div>
          <Todo todoList={incompleteTodoList} />
        ) : (
          <>
            <Image
              src={'/images/empty-todo.svg'}
              width={120}
              height={120}
              alt={'empty-done-image'}
            />
            <p className={'text-slate-400'}>
              할 일이 없어요.
              <br />
              TODO를 새롭게 추가해주세요!
            </p>
          </>
        )}
      </div>
    </div>
  );
}
