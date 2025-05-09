import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ellipsis, Pencil, Trash } from "lucide-react";

//파일 설정관련련

type Props = {
  file: {
    id: number;
    name: string;
  };
  onDelete: () => void;
  onRename: (newName: string) => void;
};

export function Mainfilemenu({ file, onDelete, onRename }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(file.name);
  const router = useRouter();

  const handleRename = () => {
    if (tempName.trim()) {
      onRename(tempName);
      setIsEditing(false);
    }
  };

  const handleOpenFile = () => {
    if (!isEditing && !menuOpen) {
      router.push(`/file/${file.id}`);
    }
  };

  return (
    <div
      className="relative p-4 border rounded-md bg-white flex justify-between items-center hover:bg-gray-100 transition cursor-pointer"
      onClick={handleOpenFile}
    >
      {/* 파일 이름 or 수정 input */}
      {isEditing ? (
        <input
          className="border px-2 py-1 rounded w-full max-w-xs"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          onBlur={handleRename}
          onKeyDown={(e) => e.key === "Enter" && handleRename()}
          autoFocus
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <div>
          <h3 className="font-bold truncate max-w-[240px]" title={file.name}>
            {file.name}
          </h3>
        </div>
      )}

      {/* ⋯ 메뉴 버튼 */}
      <div className="relative z-20" onClick={(e) => e.stopPropagation()}>
        <button
          className="text-2xl ml-4"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <Ellipsis />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-24 bg-white shadow-md border rounded z-10">
            <button
              className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setIsEditing(true);
                setMenuOpen(false);
              }}
            >
              <Pencil size={16} className="ml-1" />
              수정
            </button>
            <button
              className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-100 text-red-500"
              onClick={() => {
                onDelete();
                setMenuOpen(false);
              }}
            >
              <Trash size={16} className="ml-1" />
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
