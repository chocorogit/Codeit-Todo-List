'use client';
import { useContext, useState } from 'react';
import Button from './Button';
import Input from './Input';
import { TodoContext } from '../context/TodoContext';

export default function Form() {
  const [inputValue, setInputValue] = useState<string>('');

  const { addTodo } = useContext(TodoContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // 새로고침 방지
    e.preventDefault();
    // 할 일 추가
    addTodo(inputValue);
    // 입력창 초기화
    setInputValue('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={
        'flex justify-between w-full items-center gap-2 tablet:gap-4 mb-4 tablet:mb-6 tablet:pt-6 pt-4'
      }
    >
      {/* 할 일 입력창 */}
      <Input
        inputValue={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {/* 추가 하기 버튼 */}
      <Button type={'submit'} />
    </form>
  );
}
