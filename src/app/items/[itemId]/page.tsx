'use client';
import Button from '@/app/components/Button';
import { TodoContext } from '@/app/context/TodoContext';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

export default function Detail() {
  const router = useRouter();
  const [memo, setMemo] = useState('');

  const { todoList, deleteTodo } = useContext(TodoContext);
  const params = useParams<{ itemId: string }>();
  const selectedTodo = todoList.find(
    (todo) => String(todo.id) === params.itemId
  );

  if (!selectedTodo) {
    return <p>일치하는 할 일이 없습니다.</p>;
  }

  //   console.log('selectedTodo', selectedTodo);
  const { isCompleted, name } = selectedTodo;

  const handleDeleteTodo = () => {
    deleteTodo(selectedTodo.id);

    // 투두 삭제 알림
    console.log(`Todo ${selectedTodo.id} deleted`);

    // /home으로 이동
    router.push('/');
  };

  return (
    <div className={'tablet:pt-6 pt-4 mt-[1px]'}>
      {/* 할 일 이름 */}
      <div
        className={`relative w-full h-16 border-2 border-slate-900 rounded-3xl tablet:mb-6 mb-4 ${
          isCompleted ? 'bg-violet-200' : 'bg-white'
        }`}
      >
        <div
          className={
            'absolute top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] flex items-center gap-4'
          }
        >
          <Image
            src={
              isCompleted === true
                ? '/images/checked.svg'
                : '/images/unchecked.svg'
            }
            width={32}
            height={32}
            alt={'check-image'}
          />
          <p className={'text-xl font-bold underline underline-offset-1'}>
            {name}
          </p>
        </div>
      </div>
      {/* 이미지 첨부 */}
      <div
        className={
          'relative flex justify-center w-full h-[310px] bg-slate-50 rounded-3xl border-2 border-dashed border-slate-300 tablet:mb-6 mb-4 cursor-pointer'
        }
      >
        <Image
          src={'/images/img.svg'}
          width={64}
          height={64}
          alt={'img-icon-image'}
        />
        <Image
          className={'absolute bottom-4 right-4'}
          src={'/images/plus.svg'}
          width={64}
          height={64}
          alt={'plus-icon-image'}
        />
      </div>
      {/* 메모 */}
      <div
        className={'relative w-full h-[310px] rounded-3xl overflow-hidden mb-6'}
      >
        <div className={'absolute top-0 left-0 min-h-[310px] w-full h-full'}>
          <Image
            src={'/images/memo.svg'}
            // width={696}
            // height={426}
            layout='fill'
            objectFit='cover'
            alt={'memo-icon-image'}
          />
        </div>
        <div
          className={
            'absolute flex flex-col items-center justify-center gap-5 w-full h-full py-6'
          }
        >
          <p className={'text-amber-800 font-extrabold'}>Memo</p>
          {/* memo 입력창 */}
          <textarea
            className={
              'bg-transparent text-center text-slate-800 resize-none border-none outline-none focus:ring-0 m-0 p-0 w-[calc(100%_-_20px)] h-full '
            }
            value={memo}
            onChange={(e) => {
              setMemo(e.target.value);
            }}
            placeholder='힐 일에 메모를 추가해보세요!'
          >
            오메가 3, 프로폴리스, 아연 챙겨먹기
          </textarea>
        </div>
      </div>
      {/* 수정, 삭제 버튼 */}
      <div
        className={'flex tablet:gap-4 gap-2 justify-center laptop:justify-end'}
      >
        <Button
          imgSize={'one'}
          imgUrl={{
            default: '/images/Type=Edit, Size=Large, State=Default.svg',
            active: '/images/Type=Edit, Size=Large, State=Active.svg',
          }}
        ></Button>
        <Button
          imgSize={'one'}
          imgUrl={{
            default: '/images/Type=Delete, Size=Large, State=Default.svg',
            active: '/images/Type=Delete, Size=Large, State=Active.svg',
          }}
          onClick={handleDeleteTodo}
        ></Button>
      </div>
    </div>
  );
}
