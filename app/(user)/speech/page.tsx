import { verifySession } from "@/actions/sessions";
import { senior } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getOrCreateDiaryId } from "@/data/diary";
import SpeechClient from "@/components/speech/SpeechClient";
import db from "@/db";
import { useEffect } from "react";

export default async function SpeechPage() {
  const session = await verifySession();

  if (!session || session.role !== "user") {
    throw new Error("로그인된 어르신만 접근할 수 있습니다.");
  }

  const seniorInfo = await db.query.senior.findFirst({
    where: eq(senior.id, session.id), // ✅ 컬럼 지정
  });

  if (!seniorInfo) {
    throw new Error("해당 어르신 정보를 찾을 수 없습니다.");
  }

  let diaryId = await getOrCreateDiaryId(seniorInfo.id);
  return <SpeechClient userId={session.id} DiaryId={diaryId} />;
}
