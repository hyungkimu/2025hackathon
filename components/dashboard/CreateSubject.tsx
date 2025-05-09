"use client";

//과목 생성할때 뜨는 창
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (fileName: string) => void;
};

export function CreateSubject({ isOpen, onClose, onCreate }: Props) {
  const [fileName, setFileName] = useState("");

  if (!isOpen) return null;

  const handleCreate = () => {
    if (!fileName.trim()) return;
    onCreate(fileName);
    setFileName("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white px-6 pt-10 py-10 rounded-md shadow-md w-[300px]">
        <h2 className="text-xl font-bold mb-5">과목 생성</h2>

        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="과목명"
          className="w-full border px-3 py-2 mb-6 rounded-md"
        />

        <div className="flex w-full justify-end gap-2" >
          <button
            className="px-4 flex-1 py-2 bg-gray-300 rounded-md"
            onClick={() => {
              setFileName("");
              onClose();
            }}
          >
            취소
          </button>
          <button
            className="px-4 flex-1 py-2 bg-red-500 text-white rounded-md"
            onClick={handleCreate}
          >
            생성
          </button>
        </div>
      </div>
    </div>
  );
}
