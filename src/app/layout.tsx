import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { TodoProvider } from './context/TodoContext';
import Header from './components/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Todo List',
  description: '할 일 목록을 관리하는 To Do 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TodoProvider>
      <html lang='en'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased  bg-gray-50`}
        >
          <div
            className={'w-full h-[60px] border-b border-b-slate-200 bg-white'}
          >
            {/* 헤더 */}
            <Header />
            {/* 컨텐츠 */}
            <main
              className={
                'max-w-7xl w-full px-4 laptop:px-10 tablet:px-6 mx-auto leading-[1.125] tablet:pt-6 pt-4'
              }
            >
              {children}
            </main>
          </div>
        </body>
      </html>
    </TodoProvider>
  );
}
