import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ itemId: string }> }
) {
  const { itemId } = await params;

  try {
    // tenantId
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    // 외부 API 서버 URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const formData = await req.formData();
    console.log('Received formData:', formData);

    const name = formData.get('name');
    const isCompleted = formData.get('isCompleted');
    const memo = formData.get('memo');
    const imageFile = formData.get('image');

    let imageUrl = null;
    if (imageFile && imageFile instanceof File) {
      // FormData를 사용하여 이미지를 외부 서버로 업로드
      const imageFormData = new FormData();
      imageFormData.append('image', imageFile);

      const uploadRes = await fetch(`${apiUrl}/${tenantId}/images/upload`, {
        method: 'POST',
        body: imageFormData,
      });

      if (!uploadRes.ok) {
        throw new Error('이미지 업로드에 실패했습니다.');
      }

      const uploadData = await uploadRes.json();
      imageUrl = await uploadData.url; // 업로드된 이미지 URL
      // console.log('uploadData.url________', uploadData.url);
    }

    console.log('imageUrl________', imageUrl);
    // 1. 기존 데이터 가져오기 (GET 요청)
    const getItemRes = await fetch(`${apiUrl}/${tenantId}/items/${itemId}`);
    if (!getItemRes.ok) {
      throw new Error('기존 할 일 데이터를 가져오는 데 실패했습니다.');
    }
    const existingItem = await getItemRes.json();

    const updatedData = {
      name: name ?? (name || existingItem.name),
      isCompleted: isCompleted ?? isCompleted,
      memo: memo ?? (memo || existingItem.memo),
      imageUrl: imageUrl ?? (imageUrl || existingItem.imageUrl),
    };

    // 3. 외부 API 서버로 PATCH 요청 (새로운 데이터 전송)
    const res = await fetch(`${apiUrl}/${tenantId}/items/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData), // 변경된 데이터 전송
    });

    const data = await res.json();

    // 요청 성공, 메시지, 데이터 반환
    return NextResponse.json({
      message: '해당 tenantId의 투두리스트에 할 일 업데이트 성공',
      data: data,
    });
  } catch (err) {
    console.error('할 일 업데이트에 문제가 발생했습니다. : ', err);
    // 에러 메시지, 상태 반환
    return NextResponse.json(
      { message: '할 일 업데이트에 문제 발생' },
      { status: 500 }
    );
  }
}
