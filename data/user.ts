import { verifySession } from "@/actions/sessions";
import db from "@/db";
import { senior, admin } from "@/db/schema";
import { User } from "@/types/db";
import { eq } from "drizzle-orm";

export const getAdminByEmail = async (email: string): Promise<User | null> => {
  try {
    const existingUser = await db.query.admin.findFirst({
      where: eq(admin.email, email),
    });

    if (!existingUser) {
      return null;
    }

    return existingUser;
  } catch (error) {
    console.error("error", error);
    throw new Error("문제가 발생했습니다.");
  }
};

export const getSenierById = async (id: string): Promise<User | null> => {
  try {
    const existingUser = await db.query.senior.findFirst({
      where: eq(senior.seniorId, id),
    });

    return existingUser ?? null;
  } catch (error) {
    console.error("error", error);
    throw new Error("문제가 발생했습니다.");
  }
};
