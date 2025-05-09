import db from "@/db";
import { diary } from "@/db/schema";
import { getTodayDate } from "@/lib/utils";
import { and, eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

/**
 * 'YYYY-MM-DD' 형식의 오늘 날짜 문자열 반환
 */

/**
 * 주어진 seniorId에 대해 해당 날짜의 다이어리 1건 반환
 * 날짜가 없으면 자동으로 오늘 날짜 사용
 */
export async function getDiary(seniorId: string, date?: string) {
  const targetDate = date ?? getTodayDate();

  const result = await db
    .select()
    .from(diary)
    .where(and(eq(diary.seniorId, seniorId), eq(diary.createdAt, targetDate)))
    .limit(1);

  return result[0] ?? null;
}

export async function getOrCreateDiaryId(seniorId: string): Promise<string> {
  const today = getTodayDate();

  const existing = await db.query.diary.findFirst({
    where: and(eq(diary.seniorId, seniorId), eq(diary.createdAt, today)),
  });

  if (existing) {
    return existing.id;
  }

  const newId = uuidv4();

  await db.insert(diary).values({
    id: newId,
    seniorId,
    createdAt: today,
    title: "", // 일단 빈 값으로 초기화
    imageUrl: "", // 일단 빈 값으로 초기화
    risk: 0, // 초기 위험도
  });

  return newId;
}
