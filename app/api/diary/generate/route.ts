"use server";

import { diary, diaryMessage } from "@/db/schema";
import { eq } from "drizzle-orm";
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import db from "@/db";

const openai = new OpenAI();

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const diaryId = form.get("diaryId")?.toString(); // = diaryId
  const historyRaw = form.get("history")?.toString();

  if (!diaryId) {
    return NextResponse.json({ error: "Missing diaryId" }, { status: 400 });
  }

  console.log(diaryId);

  if (!historyRaw) {
    return NextResponse.json({ error: "Missing history" }, { status: 400 });
  }

  let history;
  try {
    history = JSON.parse(historyRaw);
  } catch (e) {
    return NextResponse.json(
      { error: "Invalid history format" },
      { status: 400 }
    );
  }

  console.log(history);
  console.log(Array.isArray(history));

  if (!Array.isArray(history) || history.length === 0) {
    return NextResponse.json(
      { error: "Empty conversation history" },
      { status: 404 }
    );
  }

  const formatted = history
    .map((m) => `${m.role === "user" ? "어르신" : "미미"}: ${m.content}`)
    .join("\n");

  console.log(formatted);

  const spokenRes = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `너는 어르신과 대화를 나눈 AI 도우미 미미야.\n지금까지 나눈 대화를 보고, 4줄 이내의 간단한 일기를 써줘. ~했다 체로 작성하고, 한 문장이 너무 길어서는 안돼. 그리고 네 일기가 아닌 어르신이 쓴 일기처럼 작성해줘. 그리고 내역에 없는 이야기는 지어내지마.`,
      },
      {
        role: "user",
        content: formatted,
      },
    ],
  });

  const spokenSummary =
    spokenRes.choices[0].message.content?.trim() ??
    "오늘은 조용하고 따뜻한 하루였어요.";

  const existing = await db.query.diary.findFirst({
    where: eq(diary.id, diaryId),
  });

  if (!existing) {
    return NextResponse.json({ error: "Diary not found" }, { status: 404 });
  }

  const messagesToInsert = history.map((msg: any) => ({
    diaryId,
    role: msg.role,
    content: msg.content,
    createdAt: new Date(msg.createdAt),
    emotion: msg.emotion ?? null,
    risk: msg.risk ?? null,
  }));

  console.log(spokenSummary);
  await db.insert(diaryMessage).values(messagesToInsert);

  return NextResponse.json({
    spokenSummary,
  });
}
