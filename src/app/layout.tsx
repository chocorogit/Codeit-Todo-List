import type { Metadata } from 'next';
import './globals.css';
import { TodoProvider } from './context/TodoContext';
import Header from './components/Header';

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
      <html lang='ko'>
        <body className={'bg-gray-50'}>
          {/* 헤더 */}
          <Header />
          {/* 컨텐츠 */}
          <main
            className={
              'max-w-7xl w-full px-4 laptop:px-10 tablet:px-6 mx-auto leading-[1.125] '
            }
          >
            {children}
          </main>
        </body>
      </html>
    </TodoProvider>
  );
}
