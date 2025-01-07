import Image from 'next/image';
import { useState } from 'react';

type ButtonPropsType = {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  imgSize?: string;
  imgUrl?: {
    default: string;
    active?: string;
    largeDefault?: string;
    largeActive?: string;
  };
};

export default function Button({
  type = 'button',
  onClick,
  imgSize = 'two',
  imgUrl = {
    default: '/images/Type=Add, Size=Small, State=Default.svg',
    active: '/images/Type=Add, Size=Small, State=Active.svg',
    largeDefault: '/images/Type=Add, Size=Large, State=Default.svg',
    largeActive: '/images/Type=Add, Size=Large, State=Active.svg',
  },
}: ButtonPropsType) {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      {/* imgSize 1일 때 */}
      {imgSize === 'one' ? (
        <button
          type={type}
          className={'h-14 tablet:min-w-[168px] min-w-16'}
          onMouseDown={() => setIsActive(true)}
          onMouseUp={() => setIsActive(false)}
          onClick={onClick}
        >
          {/* 버튼 이미지 */}
          <Image
            src={
              !isActive
                ? imgUrl.default
                : imgUrl.active
                ? imgUrl.active
                : imgUrl.default
            }
            width={168}
            height={56}
            alt={'button-image'}
          />
        </button>
      ) : (
        <button
          type={type}
          className={
            'flex items-center justify-end h-14 tablet:min-w-[168px] min-w-16'
          }
          onMouseDown={() => setIsActive(true)}
          onMouseUp={() => setIsActive(false)}
          onClick={onClick}
        >
          {/* small size 버튼 이미지 */}
          <Image
            className={'tablet:hidden'}
            src={
              !isActive
                ? imgUrl.default
                : imgUrl.active
                ? imgUrl.active
                : imgUrl.default
            }
            width={56}
            height={56}
            alt={'button-image'}
          />
          {/* large size 버튼 이미지 */}
          <Image
            className={'hidden tablet:block'}
            src={
              imgUrl && !isActive
                ? imgUrl.largeDefault || ''
                : imgUrl.largeActive || imgUrl.largeDefault || ''
            }
            width={168}
            height={56}
            alt={'button-image'}
          />
        </button>
      )}
    </>
  );
}
