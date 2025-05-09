"use server";
import { getSenierById } from "@/data/user"; // id 기반 조회 함수
import { UserLoginSchema } from "@/schemas/auth"; // { id: string, name: string }
import { createSession } from "./sessions";
import { redirect } from "next/navigation";

export const userlogin = async (_: any, formData: FormData) => {
  // 1) 입력 검증
  const parsed = UserLoginSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
  });
  if (!parsed.success) {
    return { errorMessage: "잘못된 입력값이 있습니다." };
  }
  const { id, name } = parsed.data;

  try {
    // 2) DB에서 ID로 사용자 조회
    const existingUser = await getSenierById(id);
    if (!existingUser) {
      return { errorMessage: "존재하지 않는 사용자입니다." };
    }

    // 3) 이름 매치 확인 (단순 문자열 비교)
    if (existingUser.name !== name) {
      return { errorMessage: "이름이 일치하지 않습니다." };
    }

    // 4) 세션 생성
    await createSession({
      id: existingUser.id,
      name: existingUser.name,
      role: "user",
    });
  } catch (err) {
    console.error(err);
    return { errorMessage: "로그인 중 문제가 발생했습니다." };
  }

  // 5) 로그인 성공 시 리다이렉트
  redirect("/user/main");
};
