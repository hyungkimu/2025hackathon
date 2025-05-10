import db from "@/db"; // DB 연결
import { admin, senior } from "@/db/schema"; // 테이블 스키마
import { User } from "@/types/db";
import { eq } from "drizzle-orm";

// 예시: admin 테이블에서 이메일로 사용자 찾기
// getAdminByEmail 함수 수정
export const getAdminByEmail = async (email: string): Promise<User | null> => {
  try {
    const existingUser = await db.query.admin.findFirst({
      where: eq(admin.email, email),
    });

    if (!existingUser) {
      return null;
    }

    // admin 테이블에서 반환된 데이터를 User 타입에 맞게 변환
    const user: User = {
      id: existingUser.id, // admin 테이블의 id
      name: existingUser.name,
      email: existingUser.email, // 반드시 포함해야 하는 필드
      password: existingUser.password, // 관리자는 비밀번호가 필요할 수 있음
      adminId: existingUser.id, // adminId가 필요하면 여기서 추가
    };

    return user;
  } catch (error) {
    console.error("error", error);
    throw new Error("문제가 발생했습니다.");
  }
};

// getSenierById 함수 수정
export const getSenierById = async (id: string): Promise<User | null> => {
  try {
    // senior 테이블에서 시니어 데이터 조회
    const existingUser = await db.query.senior.findFirst({
      where: eq(senior.seniorId, id),
    });

    if (!existingUser) {
      return null;
    }

    // senior 테이블에서 가져온 시니어 데이터로 User 타입에 맞게 반환
    const adminUser = await db.query.admin.findFirst({
      where: eq(admin.id, existingUser.adminId),
    });

    if (!adminUser) {
      return null;
    }

    const user: User = {
      id: existingUser.seniorId, // senior 테이블에서 seniorId 사용
      name: existingUser.name,
      email: adminUser.email, // admin 테이블에서 email을 가져와서 연결
      phone: existingUser.phone,
      guardianPhone: existingUser.guardianPhone,
      address: existingUser.address,
      seniorId: existingUser.seniorId, // seniorId를 포함
      adminId: existingUser.adminId, // adminId를 포함
    };

    return user;
  } catch (error) {
    console.error("error", error);
    throw new Error("문제가 발생했습니다.");
  }
};

export const updateAdminById = async (
  id: string,
  data: { name: string; email: string }
) => {
  try {
    const result = await db
      .update(admin)
      .set({
        name: data.name,
        email: data.email,
      })
      .where(eq(admin.id, id));

    return result;
  } catch (error) {
    console.error("관리자 정보 업데이트 실패:", error);
    throw new Error("관리자 정보 업데이트 중 문제가 발생했습니다.");
  }
};
