import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // tenantId
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    // 외부 API 서버 URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // GET 요청
    const res = await fetch(`${apiUrl}/${tenantId}/items`);
    const data = await res.json();

    // 요청 성공, 메시지, 데이터 반환
    return NextResponse.json({
      message: '해당 tenantId의 투두리스트 불러오기 성공',
      data: data || [],
    });
  } catch (err) {
    console.error('투두리스트를 불러오는 데 문제가 발생했습니다.', err);
    // 에러 메시지, 상태 반환
    return NextResponse.json(
      { message: '투두리스트를 불러오는 데 문제 발생' },
      { status: 500 }
    );
  }
}
