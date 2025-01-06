'use client';
import Image from 'next/image';
import { TodoType } from '../context/TodoContext';
import { useState } from 'react';

type TodoListType = {
  todoList: TodoType[];
};

export default function Todo({ todoList }: TodoListType) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  return (
    <ul className={'flex flex-col gap-4 w-full'}>
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
                setIsChecked(!isChecked);
              }}
            >
              <Image
                className={'absolute top-1/2 translate-y-[-50%] left-[12px]'}
                src={
                  isChecked ? '/images/checked.svg' : '/images/unchecked.svg'
                }
                width={32}
                height={32}
                alt={'unchecked-image'}
              />
            </button>
            {todo.todo}
          </li>
        ))}
    </ul>
  );
}
