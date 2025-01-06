import Image from 'next/image';
import { useState } from 'react';

type ButtonPropsType = {
  inputValue: string;
  setInputValue: (InputValue: string) => void;
  addTodo: (todo: string) => void;
};

export default function Button({
  inputValue,
  setInputValue,
  addTodo,
}: ButtonPropsType) {
  // 버튼 이미지
  // 크기, 활성화별 구분
  const buttonImages = {
    small: {
      default: '/images/Type=Add, Size=Small, State=Default.svg',
      active: '/images/Type=Add, Size=Small, State=Active.svg',
    },
    large: {
      default: '/images/Type=Add, Size=Large, State=Default.svg',
      active: '/images/Type=Add, Size=Large, State=Active.svg',
    },
  };

  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <button
        className={
          'flex items-center justify-end min-h-16 tablet:min-w-[168px] min-w-16'
        }
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onClick={() => {
          addTodo(inputValue);
          setInputValue('');
        }}
      >
        {/* 비활성화 상태 */}
        <Image
          className={'tablet:hidden'}
          src={
            isActive
              ? buttonImages['small']['active']
              : buttonImages['small']['default']
          }
          width={56}
          height={56}
          alt={'Type=Add, Size=Small, State=Default'}
        />
        {/* 비활성화 상태 */}
        <Image
          className={'hidden tablet:block'}
          src={
            isActive
              ? buttonImages['large']['active']
              : buttonImages['large']['default']
          }
          width={168}
          height={56}
          alt={'Type=Add, Size=Large, State=Default'}
        />
      </button>
    </>
  );
}
