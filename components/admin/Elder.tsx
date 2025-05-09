"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useState } from "react";
import Regist from "./Regist";

type Props = {
  id: string;
  name: string;
};

type LinkItemType = {
  id: number;
  name: string;
};

export default function Elder({ Info }: { Info: Props[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [links, setLinks] = useState<LinkItemType[]>([]);

  const handleCreate = (name: string) => {
    const newLink: LinkItemType = {
      id: Date.now(),
      name,
    };
    setLinks((prev) => [...prev, newLink]);
    setIsModalOpen(false);
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {!Info || Info.length === 0 ? (
        <div></div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Info.map((item, index) => (
            <Link key={index} href={`/diary`}>
              <div className="flex flex-col items-center cursor-pointer">
                <Avatar className="flex h-[8em] w-[8em]">
                  <AvatarImage src="/logo.png" alt="@shadcn" />
                  <AvatarFallback className="text-5xl">
                    {item.name[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700 mt-1">
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
      {/* 등록 */}

      <button
        onClick={() => setIsModalOpen(true)}
        className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 text-muted-foreground hover:border-primary hover:text-primary"
      >
        <span className="text-xl font-bold">+</span>
        <span className="text-sm">등록</span>
      </button>
      <Regist
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}
