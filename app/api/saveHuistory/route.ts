// app/api/saveHistory/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import { message } from '@/db/schema';

export async function POST(req: NextRequest) {
  const { conversationId, messages } = await req.json();

  if (!conversationId || !messages?.length) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  /*
  await db.insert(messages).values(
    messages.map((msg: any) => ({
      conversationId,
      role: msg.role,
      content: msg.content,
      createdAt: new Date(),
    }))
  );
  */
  return NextResponse.json({ success: true });
}
