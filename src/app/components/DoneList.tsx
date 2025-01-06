'use client';
import Image from 'next/image';
import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import Todo from './Todo';

export default function DoneList() {
  const { todoList } = useContext(TodoContext);

  const completeTodos = todoList.filter((todo) => todo.isDone === true);
  return (
    <>
      {/* done 제목 */}
      <Image
        className={'mb-4'}
        src={'/images/done.svg'}
        width={101}
        height={36}
        alt={'todo-title-image'}
      />
      {/* done 리스트 영역 */}
      {completeTodos.length > 0 ? (
        <Todo todoList={completeTodos} />
      ) : (
        <div className={'flex flex-col items-center w-full h-full text-center'}>
          <Image
            src={'/images/empty-done.svg'}
            width={120}
            height={120}
            alt={'empty-done-image'}
          />
          <p className={'text-slate-400'}>
            아직 다 한 일이 없어요.
            <br />
            해야 할 일을 체크해보세요!
          </p>
        </div>
      )}
    </>
  );
}
