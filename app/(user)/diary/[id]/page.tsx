// app/dashboard/[seniorId]/page.tsx
import db from "@/db";
import { diary, senior } from "@/db/schema";
import { eq } from "drizzle-orm";
import Dashboard from "@/components/dashboard/Dashboard";
import { verifySession } from "@/actions/sessions";

export default async function DashboardPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await verifySession();
  if (!session) throw new Error("로그인이 필요합니다.");

  let seniorInfo;

  if (session.role === "user") {
    // 어르신이라면 session.seniorId → seniorId(text)로 찾기
    seniorInfo = await db.query.senior.findFirst({
      where: eq(senior.id, session.id),
    });
  } else {
    // 관리자는 UUID를 직접 param으로 전달
    seniorInfo = await db.query.senior.findFirst({
      where: eq(senior.id, params.id),
    });
  }

  if (!seniorInfo) {
    throw new Error("해당 어르신을 찾을 수 없습니다.");
  }

  const user = {
    name: seniorInfo.name,
    id: seniorInfo.id,
    seniorId: seniorInfo.seniorId,
    number: seniorInfo.phone,
    number_p: seniorInfo.guardianPhone,
    home: seniorInfo.address,
  };

  const diaries = await db.query.diary.findMany({
    where: eq(diary.seniorId, seniorInfo.id),
    columns: { createdAt: true },
  });

  const availableDates = diaries
    .filter((d): d is { createdAt: string } => d.createdAt !== null) // 타입 좁히기
    .map((d) => new Date(d.createdAt).toISOString().slice(0, 10));

  return <Dashboard user={user} availableDates={availableDates} />;
}
