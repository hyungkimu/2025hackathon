"use client";

//파일 생성할때 뜨는 창창

import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (fileName: string) => void;
};

export function Submodal({ isOpen, onClose, onCreate }: Props) {
  const [fileName, setFileName] = useState("");

  if (!isOpen) return null;

  const handleCreate = () => {
    if (!fileName.trim()) return;
    onCreate(fileName);
    setFileName("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-[300px]">
        <h2 className="text-lg font-bold mb-4">새로운 퀴즈 만들기</h2>

        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="퀴즈 이름"
          className="w-full border px-3 py-2 mb-4 rounded-md"
        />

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md"
            onClick={() => {
              setFileName("");
              onClose();
            }}
          >
            취소
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleCreate}
          >
            생성
          </button>
        </div>
      </div>
    </div>
  );
}
