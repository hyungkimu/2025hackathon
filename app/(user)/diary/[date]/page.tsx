import { DrawCard } from "@/components/diary/DrawCard";
import { checkDiaryOrRedirect } from "@/lib/checkTodayDiary";
import { redirect } from "next/navigation";
import { verifySession } from "@/actions/sessions";

export default async function DrawPage() {
  const session = await verifySession();

  const redirectUrl = await checkDiaryOrRedirect(session);
  if (redirectUrl) redirect(redirectUrl);

  return <DrawCard />;
}
