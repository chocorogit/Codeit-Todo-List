import TodoList from './components/TodoList';
import DoneList from './components/DoneList';
import Form from './components/Form';

export default function Home() {
  return (
    <>
      <Form />
      <div className={'w-full h-full laptop:flex laptop:gap-6'}>
        {/* 할 일 리스트 영역 */}
        <TodoList />
        {/* 완료 리스트 영역 */}
        <DoneList />
      </div>
    </>
  );
}
