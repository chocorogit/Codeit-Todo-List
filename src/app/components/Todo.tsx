'use client';
import Image from 'next/image';
import { TodoContext, TodoType } from '../context/TodoContext';
import { useContext } from 'react';

type TodoPropsType = {
  todoList: TodoType[];
};

export default function Todo({ todoList }: TodoPropsType) {
  const { toggleTodoStatus } = useContext(TodoContext);

  return (
    <ul className={'flex flex-col gap-4 w-full text-center'}>
      {todoList &&
        todoList.map((todo) => (
          <li
            className={
              'relative w-full max-h-[50px] leading-[14px] px-[12px] py-4 border-2 border-slate-900 rounded-full'
            }
            key={todo.id}
          >
            <button
              type={'button'}
              onClick={() => {
                toggleTodoStatus(todo.id, todo.isCompleted);
              }}
            >
              <Image
                className={'absolute top-1/2 translate-y-[-50%] left-[12px]'}
                src={
                  todo.isCompleted === true
                    ? '/images/checked.svg'
                    : '/images/unchecked.svg'
                }
                width={32}
                height={32}
                alt={'unchecked-image'}
              />
            </button>
            {todo.name}
          </li>
        ))}
    </ul>
  );
}
