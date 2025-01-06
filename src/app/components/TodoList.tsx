'use client';
import Image from 'next/image';
import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

export default function TodoList() {
  const { todoList } = useContext(TodoContext);
  return (
    <div className={'mb-12 tablet:mb-0'}>
      <Image
        className={'mb-4'}
        src={'/images/todo.svg'}
        width={101}
        height={36}
        alt={'todo-title-image'}
      />
      <div className={'flex flex-col items-center w-full h-full text-center'}>
        <Image
          src={'/images/empty-todo.svg'}
          width={120}
          height={120}
          alt={'empty-done-image'}
        />
        {todoList.length > 0 ? (
          <div>
            {todoList.map((todo) => (
              <div key={todo.id}>{todo.todo}</div>
            ))}
          </div>
        ) : (
          <p className={'text-slate-400'}>
            할 일이 없어요.
            <br />
            TODO를 새롭게 추가해주세요!
          </p>
        )}
      </div>
    </div>
  );
}
