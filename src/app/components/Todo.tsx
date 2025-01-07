'use client';
import Image from 'next/image';
import { TodoContext, TodoType } from '../context/TodoContext';
import { useContext } from 'react';
import Link from 'next/link';

type TodoPropsType = {
  todoList: TodoType[];
};

export default function Todo({ todoList }: TodoPropsType) {
  const { toggleTodoStatus } = useContext(TodoContext);

  return (
    <ul className={'flex flex-col gap-4 w-full'}>
      {todoList &&
        todoList.map((todo) => (
          <li
            className={
              'relative w-full h-full max-h-[50px] leading-[14px] border-2 border-slate-900 rounded-full overflow-hidden'
            }
            key={todo.id}
          >
            <input
              className={'hidden'}
              id={`todo-${todo.id}`}
              type='checkbox'
              checked={todo.isCompleted}
              onChange={() => toggleTodoStatus(todo.id, todo.isCompleted)}
            />
            <label htmlFor={`todo-${todo.id}`} style={{ cursor: 'pointer' }}>
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
            </label>
            <Link
              className={`block py-4 pr-[12px] pl-[60px] ${
                todo.isCompleted ? 'bg-violet-100 line-through' : ''
              }`}
              href={`/items/${todo.id}`}
            >
              {todo.name}
            </Link>
          </li>
        ))}
    </ul>
  );
}
