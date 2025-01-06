'use client';
import { useContext, useState } from 'react';
import Button from './Button';
import Input from './Input';
import { TodoContext } from '../context/TodoContext';

export default function Form() {
  const [inputValue, setInputValue] = useState<string>('');

  const { addTodo } = useContext(TodoContext);

  return (
    <form
      onClick={(e) => {
        e.preventDefault();
      }}
      className={
        'flex justify-between w-full h-[56px] items-center gap-2 mb-4 tablet:mb-6'
      }
    >
      {/* 할 일 입력창 */}
      <Input
        inputValue={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {/* 추가 하기 버튼 */}
      <Button
        inputValue={inputValue}
        setInputValue={setInputValue}
        addTodo={addTodo}
      />
    </form>
  );
}
