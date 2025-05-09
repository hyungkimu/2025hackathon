"use server";

import db from "@/db";
import { senior } from "@/db/schema";
import { ManagerInsertSchema } from "@/schemas/auth";
import { uuid } from "drizzle-orm/pg-core";
import { verifySession } from "./sessions";
import { revalidatePath } from "next/cache";

export const regist = async (_: any, formData: FormData) => {
  const validatedFields = ManagerInsertSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    elderPhone: formData.get("elderPhone"),
    guardPhone: formData.get("guardPhone"),
    elderadress: formData.get("elderadress"),
  });

  if (!validatedFields.success) {
    return {
      errorMessage: "잘못된 입력값이 있습니다.",
    };
  }

  const data = validatedFields.data;
  const session = await verifySession();
  const adminId = session?.id;

  if (!adminId) {
    return { errorMessage: "세션이 유효하지 않습니다." };
  }

  try {
    await db.insert(senior).values({
      adminId, // 세션에서 가져오는 게 일반적
      seniorId: data.id,
      name: data.name,
      phone: data.elderPhone,
      guardianPhone: data.guardPhone,
      address: data.elderadress,
    });

    revalidatePath("/manager/main");
    return {
      successMessage: "등록이 완료되었습니다.",
    };
  } catch (err) {
    console.error(err);
    return {
      errorMessage: "DB 등록 중 문제가 발생했습니다.",
    };
  }
};
