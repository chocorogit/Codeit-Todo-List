import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  context: { params: { itemId: string } }
) {
  const { itemId } = context.params;

  try {
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // 삭제 API 호출
    const res = await fetch(`${apiUrl}/${tenantId}/items/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('할 일 삭제에 실패했습니다.');
    }

    const data = await res.json();

    return NextResponse.json({
      message: '할 일 삭제 성공',
      data: data,
    });
  } catch (err) {
    console.error('할 일 삭제에 문제가 발생했습니다. : ', err);
    return NextResponse.json(
      { message: '할 일 삭제에 문제가 발생했습니다.' },
      { status: 500 }
    );
  }
}
