import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div className={'w-full h-[60px] border-b border-b-slate-200 bg-white'}>
      <header
        className={
          'flex align-middle items-center max-w-7xl w-full h-full laptop:px-10 tablet:px-6 px-4 mx-auto'
        }
      >
        <h1 className={'cursor-pointer'}>
          <Link href='/'>
            <Image
              className={'tablet:hidden'}
              src='/images/mobile-logo.svg'
              width='71'
              height='40'
              alt='doit-mobile-logo'
            />
            <Image
              className={'hidden tablet:block'}
              src='/images/logo.svg'
              width='151'
              height='40'
              alt='doit-logo'
            />
          </Link>
        </h1>
      </header>
    </div>
  );
}
