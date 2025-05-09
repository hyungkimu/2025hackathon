import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { diary } from "@/db/schema";
import { eq } from "drizzle-orm";
import { format } from "date-fns";

const openai = new OpenAI();

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const spokenSummary = form.get("spokenSummary")?.toString();
  const diaryId = form.get("diaryId")?.toString();

  if (!spokenSummary || !diaryId) {
    return NextResponse.json(
      { error: "spokenSummary 또는 diaryId 누락" },
      { status: 400 }
    );
  }

  const imagePrompt = `
    A warm, crayon-style drawing of a Korean elderly person's day: ${spokenSummary}. 
    The elderly person is the main focus of the image. 
    Soft pastel tones, hand-drawn look with colored pencil or crayon texture. 
    Cozy, childlike diary-style illustration. No text, only the drawing.
  `;

  const image = await openai.images.generate({
    model: "dall-e-3",
    prompt: imagePrompt,
    size: "1024x1024",
    n: 1,
  });

  const imageUrl = image.data[0].url;

  // 1. DB에 이미지 URL 저장
  await db.update(diary).set({ imageUrl }).where(eq(diary.id, diaryId));

  // 2. 확인용 조회
  const updatedDiary = await db.query.diary.findFirst({
    where: eq(diary.id, diaryId),
    columns: { createdAt: true },
  });

  if (!updatedDiary?.createdAt) {
    return NextResponse.json(
      { error: "업데이트 후 조회 실패" },
      { status: 500 }
    );
  }

  // 3. 날짜 경로로 리다이렉트
  const dateStr = format(updatedDiary.createdAt, "yyyy-MM-dd");
  return NextResponse.redirect(new URL(`/diary/${dateStr}`, req.url));
}
