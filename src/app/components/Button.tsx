'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function Button() {
  const addSmallBtn = '/images/Type=Add, Size=Small, State=Default.svg';
  const addLargeBtn = '/images/Type=Add, Size=Large, State=Default.svg';
  const addSmallBtnActive = '/images/Type=Add, Size=Small, State=Active.svg';
  const addLargeBtnActive = '/images/Type=Add, Size=Large, State=Active.svg';

  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <button
        className={
          'flex items-center justify-end min-h-16 tablet:min-w-[168px] min-w-16'
        }
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
      >
        {/* 비활성화 상태 */}
        <Image
          className={'tablet:hidden'}
          src={isActive ? addSmallBtnActive : addSmallBtn}
          width={56}
          height={56}
          alt={'Type=Add, Size=Small, State=Default'}
        />
        {/* 비활성화 상태 */}
        <Image
          className={'hidden tablet:block'}
          src={isActive ? addLargeBtnActive : addLargeBtn}
          width={168}
          height={56}
          alt={'Type=Add, Size=Large, State=Default'}
        />
      </button>
    </>
  );
}
