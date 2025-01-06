import Header from './components/Header';
import TodoList from './components/TodoList';
import DoneList from './components/DoneList';
import Form from './components/Form';

export default function Home() {
  return (
    <>
      <div className={'w-full h-[60px] border border-b-slate-200'}>
        {/* 헤더 */}
        <Header />
        {/* 컨텐츠 */}
        <main
          className={
            'max-w-7xl w-full px-4 tablet:px-6 mx-auto leading-[1.125]'
          }
        >
          <Form />
          {/* 할 일 리스트 영역 */}
          <TodoList />
          {/* 완료 리스트 영역 */}
          <DoneList />
        </main>
      </div>
    </>
  );
}
