import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header
      className={
        'flex align-middle items-center  max-w-7xl w-full h-full tablet:px-6 px-4 mx-auto tablet:mb-6 mb-4'
      }
    >
      <h1 className={'cursor-pointer'}>
        <Link href='/'>
          <Image
            src='images/mobile-logo.svg'
            width='71'
            height='40'
            alt='doit-mobile-logo'
          />
          {/* <Image
            src='images/logo.svg'
            width='151'
            height='40'
            alt='doit-logo'
          /> */}
        </Link>
      </h1>
    </header>
  );
}
