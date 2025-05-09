import { verifySession } from "@/actions/sessions";
import Dashboard from "@/components/dashboard/Dashboard";
import db from "@/db";
import { diary } from "@/db/schema";
import { checkDiaryOrRedirect } from "@/lib/checkTodayDiary";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await verifySession();

  const redirectUrl = await checkDiaryOrRedirect(session);
  if (redirectUrl) redirect(redirectUrl);

  const diaries = await db.query.diary.findMany({
    columns: { createdAt: true },
    where: session.role === "user" ? { seniorId: session.id } : undefined,
  });

  const availableDates = diaries.map(
    (d) => d.createdAt.slice(0, 10) // createdAt이 string일 경우
  );

  return <Dashboard availableDates={availableDates} />;
}
