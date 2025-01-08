'use client';
import Button from '@/app/components/Button';
import { TodoContext } from '@/app/context/TodoContext';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';

export default function Detail() {
  const router = useRouter();
  const [memo, setMemo] = useState('');
  const { todoList, deleteTodo, updateTodo } = useContext(TodoContext);
  const [inputValue, setInputValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const params = useParams<{ itemId: string }>();
  const selectedTodo = todoList.find(
    (todo) => String(todo.id) === params.itemId
  );

  useEffect(() => {
    if (selectedTodo) {
      setInputValue(selectedTodo.name || '');
      setIsCompleted(selectedTodo.isCompleted || false);
      setMemo(selectedTodo.memo || '');
      setImageUrl(selectedTodo.imageUrl || '');
    }
  }, [selectedTodo]);

  if (!selectedTodo) {
    return <p>일치하는 할 일이 없습니다.</p>;
  }

  const handleDeleteTodo = () => {
    deleteTodo(selectedTodo.id);

    // 이동
    router.push('/');
  };

  // 이미지 선택
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    // 이미지 크기 제한
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하만 가능합니다.');
        return;
      }

      //   이미지 파일명 제한
      const fileName = file.name;
      if (/[\u3131-\uD79D]/.test(fileName)) {
        alert('파일명은 한글이 포함될 수 없습니다.');
        return;
      }

      readFileUrl(file);
      setImageFile(file);
    }
  };

  //  이미지 파일 미리보기
  const readFileUrl = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      if (reader.result && typeof reader.result === 'string') {
        setImageUrl(reader.result);
      }
    };
  };

  const handleUpdateTodo = async () => {
    if (!inputValue.trim()) {
      alert('할 일 이름을 입력해주세요');
      return;
    }

    const formData = new FormData();
    // 이름이 수정되었을 때만 업데이트
    if (inputValue !== selectedTodo.name) {
      formData.append('name', inputValue);
    }

    // 완료 상태가 수정되었을 때만 업데이트
    if (isCompleted !== selectedTodo.isCompleted) {
      formData.append('isCompleted', String(isCompleted));
    }

    // 메모가 수정되었을 때만 업데이트
    if (memo !== selectedTodo.memo) {
      formData.append('memo', memo);
    }

    // 이미지가 수정되었을 때만 추가
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await updateTodo(selectedTodo.id, formData);

      router.push('/');
    } catch (error) {
      console.error('업데이트 실패:', error);
    }
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
            'absolute top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] flex items-center gap-4 cursor-pointer'
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
            onClick={() => setIsCompleted(!isCompleted)}
          />
          <input
            className={
              'text-xl font-bold underline underline-offset-1 bg-transparent'
            }
            type={'text'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      </div>
      {/* 이미지 첨부 */}
      <div
        className={
          'relative flex justify-center w-full h-[310px] bg-slate-50 rounded-3xl border-2 border-dashed border-slate-300 tablet:mb-6 mb-4 overflow-hidden'
        }
      >
        {imageUrl ? (
          <Image
            className={'w-full h-full object-cover'}
            src={imageUrl ? imageUrl : ''}
            fill
            alt={'upload-image'}
          />
        ) : null}
        <Image
          src={'/images/img.svg'}
          width={64}
          height={64}
          alt={'img-icon-image'}
        />
        <Image
          className={'absolute bottom-4 right-4 cursor-pointer'}
          src={'/images/plus.svg'}
          width={64}
          height={64}
          alt={'plus-icon-image'}
          onClick={() => fileInputRef.current?.click()}
        />
        {/* 파일 입력 */}
        <input
          className={'hidden'}
          ref={fileInputRef}
          type='file'
          accept='image/*'
          onChange={handleImageUpload}
        />
      </div>
      {/* 메모 */}
      <div
        className={'relative w-full h-[310px] rounded-3xl overflow-hidden mb-6'}
      >
        <div className={'absolute top-0 left-0 min-h-[310px] w-full h-full'}>
          <Image
            className={'object-cover'}
            src={'/images/memo.svg'}
            // width={696}
            // height={426}
            fill
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
          onClick={handleUpdateTodo}
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
