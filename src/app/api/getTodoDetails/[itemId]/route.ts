import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    // console.log('request___________', request);
    const { itemId } = await params;
    // tenantId
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    // 외부 API 서버 URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${apiUrl}/${tenantId}/items/${itemId}`);
    if (!res.ok) {
      throw new Error(`투두 ${itemId} memo, imageUrl 가져오기 실패`);
    }

    const todoDetails = await res.json();
    // console.log('todoDetails________', todoDetails);
    return NextResponse.json(todoDetails);
  } catch (error) {
    console.error(`투두  memo, imageUrl 가져오기 실패:`, error);
    return NextResponse.json(
      { error: `memo, imageUrl 가져오기에 실패했습니다` },
      { status: 500 }
    );
  }
}
