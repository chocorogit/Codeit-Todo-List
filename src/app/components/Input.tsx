export default function Input({
  placeholderTxt = '할 일을 입력해주세요',
}: {
  placeholderTxt?: string;
}) {
  return (
    // 전체 영역 박스
    <div className={'relative w-full  min-h-[54px]'}>
      {/* 입력창 */}
      <input
        className={
          'absolute z-10 max-w-[1012px] w-full h-[53px] rounded-full border-2 border-slate-900 px-6 text-slate-900 placeholder-slate-500'
        }
        type='text'
        placeholder={placeholderTxt}
      />
      {/* 그림자 */}
      <div
        className={
          'absolute max-w-[1012px] w-full h-[53px] rounded-full border-2 border-slate-900 bg-slate-900 mt-[3.5px] tablet:ml-1 ml-[1.1px]'
        }
      ></div>
    </div>
  );
}
