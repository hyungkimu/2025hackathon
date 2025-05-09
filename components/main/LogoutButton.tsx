"use client";

import { deleteSession } from "@/actions/sessions";
import { Button } from "../ui/button";
//로그아웃 버튼튼
export function LogoutButton() {
  return (
    <Button
      className="w-[80%] bg-white text-black ring-2 ring-black"
      onClick={() => deleteSession()}
    >
      로그아웃{" "}
    </Button>
  );
}
