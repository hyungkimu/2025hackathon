"use client";

import * as React from "react";
import { useState, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { updateAdminInfo } from "@/actions/updateadmin";
import { toast } from "react-hot-toast";
import { AdminEditSchema } from "@/schemas/auth";
import { useRouter } from "next/navigation";
import { deleteSession } from "@/actions/sessions";

type Props = {
  id: string;
  name: string;
  email: string;
};

export default function AdminInfo({ Admin }: { Admin: Props }) {
  const [name, setName] = useState(Admin.name);
  const [email, setEmail] = useState(Admin.email);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const handleSave = () => {
    const validation = AdminEditSchema.safeParse({ name, email });

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      if (errors.name?.[0]) toast.error(`이름: ${errors.name[0]}`);
      if (errors.email?.[0]) toast.error(`이메일: ${errors.email[0]}`);
      return;
    }

    startTransition(async () => {
      const result = await updateAdminInfo(Admin.id, name, email);
      if (result.success) {
        toast.success("프로필이 저장되었습니다.");
        deleteSession();
        await delay(2000);
        router.push(`/managerlogin/`);
      } else {
        toast.error(result.errorMessage || "저장 실패");
      }
    });
  };

  return (
    <div className="flex gap-12 mb-8 p-4 pb-8 border-b">
      <Avatar className="w-[8em] h-[8em]">
        <AvatarImage src="/.png" className="rounded-full" />
        <AvatarFallback className="w-[2em] h-[2em] flex items-center justify-center text-7xl rounded-full bg-gray-200">
          {Admin.name[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col h-full">
        <div className="flex-1 pt-5 gap-2">
          <p className="text-xl font-semibold">{Admin.name}</p>
          <p className="text-sm text-muted-foreground">Email | {Admin.email}</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-5 w-[100px]" size="sm" variant="outline">
              프로필 수정
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <DialogHeader>
              <DialogTitle>프로필 수정</DialogTitle>
              <DialogDescription>이름과 이메일을 수정하세요.</DialogDescription>
            </DialogHeader>

            <div className="space-y-3 mt-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border px-4 py-2 rounded-md"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>

            <div className="flex justify-end mt-6">
              <DialogClose asChild>
                <Button variant="outline">닫기</Button>
              </DialogClose>
              <Button
                onClick={handleSave}
                disabled={isPending}
                className="ml-2"
              >
                {isPending ? "저장 중..." : "저장"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
