import { getTodayDate } from "@/lib/utils";
import db from "@/db";
import { diary } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function checkDiaryOrRedirect(session: {
  id: string;
  role: string;
}) {
  const today = getTodayDate(); // "YYYY-MM-DD"
  const isUser = session.role === "user";

  if (!isUser) return null;

  const diaryExists = await db.query.diary.findFirst({
    where: and(eq(diary.seniorId, session.id), eq(diary.createdAt, today)),
  });

  if (!diaryExists) {
    return `/user/${session.id}/speech`; // redirect target
  }

  return null;
}
