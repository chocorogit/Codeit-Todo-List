'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function DoneList() {
  const [doneList, setDoneList] = useState<string[]>([]);
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
      {doneList.length > 0 ? (
        <div>{doneList}</div>
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
