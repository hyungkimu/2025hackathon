// app/manager/main/page.tsx

import { verifySession } from "@/actions/sessions";
import { Admin } from "@/components/admin/Admin";
import db from "@/db";
import { senior } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function ManagerMainPage() {
  const session = await verifySession();
  const adminId = session?.id;

  if (!adminId) {
    redirect("/managerlogin");
  }

  const seniors = await db
    .select()
    .from(senior)
    .where(eq(senior.adminId, adminId));

  return <Admin admin={session} seniors={seniors} />;
}
