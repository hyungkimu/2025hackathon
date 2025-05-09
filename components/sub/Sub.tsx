"use client";

import { useState } from "react";
import { Subfilemenu } from "./Subfilemenu";
import { Submodal } from "./Submodal";

type FileItemType = {
  id: number;
  name: string;
};

export default function Sub() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState<FileItemType[]>([]);

  const handleCreate = (name: string) => {
    const newFile: FileItemType = {
      id: Date.now(),
      name,
    };
    setFiles((prev) => [...prev, newFile]);
    setIsModalOpen(false);
  };

  return (
    <div className="relative h-full w-full">
      {/* + 버튼 */}
      <div className="fixed top-7 right-4 flex items-center gap-2 z-50">
        <span className="text-white font-semibold">새로운 퀴즈 생성</span>
        <button
          className="px-4 py-2 bg-black text-white rounded-full text-xl"
          onClick={() => setIsModalOpen(true)}
        >
          +
        </button>
      </div>
      {/* 파일 리스트 */}
      <div className="space-y-4">
        {files.map((file) => (
          <Subfilemenu
            key={file.id}
            file={file}
            onDelete={() =>
              setFiles((prev) => prev.filter((f) => f.id !== file.id))
            }
            onRename={(newName) => {
              setFiles((prev) =>
                prev.map((f) =>
                  f.id === file.id ? { ...f, name: newName } : f
                )
              );
            }}
          />
        ))}
      </div>
      {/* 파일 */}
      <Submodal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}
