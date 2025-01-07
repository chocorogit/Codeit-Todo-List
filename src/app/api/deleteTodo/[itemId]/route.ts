import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ itemId: string }> }
) {
  const { itemId } = await params;

  try {
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // 외부 API 서버로 DELETE 요청 (해당 할 일 삭제)
    const deleteRes = await fetch(`${apiUrl}/${tenantId}/items/${itemId}`, {
      method: 'DELETE',
    });

    if (!deleteRes.ok) {
      throw new Error('할 일 삭제에 실패했습니다.');
    }

    return NextResponse.json({
      message: '할 일 삭제 성공',
    });
  } catch (err) {
    console.error('할 일 삭제 중 오류 발생: ', err);
    return NextResponse.json(
      { message: '할 일 삭제 중 오류 발생' },
      { status: 500 }
    );
  }
}
