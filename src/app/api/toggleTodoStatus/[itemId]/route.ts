import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    // itemId
    const { itemId } = await params;
    // tenantId
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    // 외부 API 서버 URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // PATCH 요청
    const res = await fetch(`${apiUrl}/${tenantId}/items/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: await req.text(),
    });

    const data = await res.json();

    console.log('data', await data);

    // 요청 성공, 메시지, 데이터 반환
    return NextResponse.json({
      message: '해당 itemId의 할 일 상태 변경 성공',
      data: data || [],
    });
  } catch (err) {
    console.error('상태 변경 중 오류 발생:', err);
    // 에러 메시지, 상태 반환
    return NextResponse.json(
      { message: '상태 변경에 실패했습니다.' },
      { status: 500 }
    );
  }
}
