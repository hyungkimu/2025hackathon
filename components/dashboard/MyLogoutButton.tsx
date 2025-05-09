"use client";

import { deleteSession } from "@/actions/sessions";
import { Button } from "../ui/button";

export function MyLogoutButton() {
  return (
    <Button className="w-[8%] bg-white text-red-800 shadow-md rounded-[20px]" onClick={() => deleteSession()}>
      로그아웃{" "}
    </Button>
  );
}