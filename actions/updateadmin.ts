"use server";

import { getAdminByEmail, updateAdminById } from "@/data/user";
import { revalidatePath } from "next/cache";

export const updateAdminInfo = async (
  adminId: string,
  name: string,
  email: string
) => {
  try {
    const existing = await getAdminByEmail(email);
    if (existing && existing.id !== adminId) {
      return { success: false, errorMessage: "이미 사용 중인 이메일입니다." };
    }

    await updateAdminById(adminId, { name, email });

    revalidatePath("/manager");
    return { success: true };
  } catch (error) {
    console.error("업데이트 실패:", error);
    return { success: false, errorMessage: "서버 오류가 발생했습니다." };
  }
};
