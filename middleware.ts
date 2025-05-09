import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  MANAGER_BASE_URL,
  USER_BASE_URL,
  MANAGER_AUTH_ROUTES,
  MANAGER_PUBLIC_ROUTES,
  USER_AUTH_ROUTES,
  USER_PUBLIC_ROUTES,
} from "./constants/routes";
import { cookies } from "next/headers";
import { verify } from "./actions/sessions";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookie = cookies().get("session")?.value;
  const session = await verify(cookie);

  const isManagerPublic = MANAGER_PUBLIC_ROUTES.includes(pathname);
  const isUserPublic = USER_PUBLIC_ROUTES.includes(pathname);

  // 인증되지 않은 사용자 접근 제한
  if (!session) {
    if (pathname.startsWith("/manager") && !isManagerPublic) {
      return NextResponse.redirect(
        new URL(MANAGER_AUTH_ROUTES.LOGIN, request.nextUrl)
      );
    }
    if (pathname.startsWith("/user") && !isUserPublic) {
      return NextResponse.redirect(
        new URL(USER_AUTH_ROUTES.LOGIN, request.nextUrl)
      );
    }
    return NextResponse.next();
  }

  const role = session.role?.trim(); // 'user ' -> 'user'

  if (pathname.startsWith("/manager") && role !== "manager") {
    return NextResponse.redirect(
      new URL(MANAGER_AUTH_ROUTES.LOGIN, request.nextUrl)
    );
  }
  if (pathname.startsWith("/user") && role !== "user") {
    return NextResponse.redirect(
      new URL(USER_AUTH_ROUTES.LOGIN, request.nextUrl)
    );
  }

  // 로그인 페이지 접근 시 인증된 경우 리디렉션
  if (isManagerPublic && role === "manager") {
    return NextResponse.redirect(new URL(MANAGER_BASE_URL, request.nextUrl));
  }
  if (isUserPublic && role === "user") {
    const userId = session.id; // 세션에 실제 userId가 있어야 함
    return NextResponse.redirect(
      new URL(`/user/${userId}/speech`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
