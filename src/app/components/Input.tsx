import { ChangeEventHandler } from 'react';

type InputPropsType = {
  inputValue?: string;
  placeholderTxt?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export default function Input({
  inputValue = '',
  placeholderTxt = '할 일을 입력해주세요',
  onChange,
}: InputPropsType) {
  return (
    // 전체 영역 박스
    <div className={'relative w-full  min-h-[54px]'}>
      {/* 입력창 */}
      <input
        className={
          'absolute z-10 w-full h-[53px] rounded-full border-2 border-slate-900 px-6 text-slate-900 placeholder-slate-500 bg-slate-100'
        }
        type='text'
        value={inputValue}
        placeholder={placeholderTxt}
        onChange={onChange}
      />
      {/* 그림자 */}
      <div
        className={
          'absolute  w-full h-[53px] rounded-full border-2 border-slate-900 bg-slate-900 mt-[3.5px] tablet:ml-1 ml-[1.1px]'
        }
      ></div>
    </div>
  );
}
