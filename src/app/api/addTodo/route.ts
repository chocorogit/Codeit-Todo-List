import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // tenantId
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    // 외부 API 서버 URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const requestBody = await req.json();

    // 요청 본문에서 필요한 필드만 추출
    const { ...filteredBody } = requestBody;
    // POST 요청
    const res = await fetch(`${apiUrl}/${tenantId}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filteredBody),
    });
    const data = await res.json();

    console.log('data', await data);
    // 요청 성공, 메시지, 데이터 반환
    return NextResponse.json({
      message: '해당 tenantId의 투두리스트에 할 일 추가 성공',
      data: data,
    });
  } catch (err) {
    console.error('할 일를 추가하는 데 문제가 발생했습니다. : ', err);
    // 에러 메시지, 상태 반환
    return NextResponse.json(
      { message: '할 일를 추가하는 데 문제 발생' },
      { status: 500 }
    );
  }
}
