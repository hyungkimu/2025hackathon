// app/diary/[date]/page.tsx
import { verifySession } from "@/actions/sessions";
import db from "@/db";
import { diary, diaryMessage, senior } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { DrawCard } from "@/components/diary/DrawCard";
import { format } from "date-fns";

export default async function DiaryPage({
  params,
}: {
  params: { id: string; date: string };
}) {
  const seniorId = params.id; // eee-fff-0202
  const date = params.date; // 2025-05-10

  const session = await verifySession();
  if (!session) {
    throw new Error("로그인이 필요합니다.");
  }

  // ✅ 조회 대상 seniorId (관리자: 쿼리에서, 사용자: 세션에서)
  const searchSeniorId = seniorId;

  if (!searchSeniorId) {
    throw new Error("조회할 어르신 ID가 제공되지 않았습니다.");
  }

  console.log(seniorId);

  const seniorInfo = await db.query.senior.findFirst({
    where: eq(senior.id, searchSeniorId),
    columns: { id: true },
  });

  if (!seniorInfo) {
    throw new Error("해당 어르신 정보를 찾을 수 없습니다.");
  }

  const formattedDate = format(new Date(date), "yyyy-MM-dd");

  const diaryEntry = await db.query.diary.findFirst({
    where: (d) =>
      eq(d.seniorId, seniorInfo.id) &&
      sql`TO_CHAR(${d.createdAt}, 'YYYY-MM-DD') = ${formattedDate}`,
    with: {
      messages: true,
    },
  });

  if (!diaryEntry) {
    throw new Error("해당 날짜의 일기를 찾을 수 없습니다.");
  }

  const chat = diaryEntry.messages.map((msg) => ({
    id: msg.id,
    sender: msg.role === "user" ? "me" : "other",
    message: msg.content,
  }));

  const joinedUserLines = diaryEntry.messages
    .filter((msg) => msg.role === "user")
    .map((msg) => msg.content)
    .join("\n");

  const cardData = {
    id: diaryEntry.id,
    date: format(new Date(diaryEntry.createdAt), "yyyy-MM-dd"),
    title: diaryEntry.title || "",
    image_url: diaryEntry.imageUrl || "/diary.jpg",
    content: diaryEntry.content,
    chat,
  };

  return <DrawCard diaryData={[cardData]} />;
}
