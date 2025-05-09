'use client'

import { Folder } from "lucide-react"
import { CardContent } from "../ui/card"
import { useState } from "react";
import { CreateSubject } from "./CreateSubject";

type Props = {
    id: string,
    title: string,
};

type FileItemType = {
  id: number;
  name: string;
};


export function SubjectList({subjects} : {subjects : Props[]}){
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
    <div className="grid grid-cols-1 gap-4">
    {subjects.length === 0 ? (
    <div className="text-center text-muted-foreground p-6 border rounded-md">
        아직 생성된 과목이 없습니다. <br /> 아래 버튼을 눌러 새로운 과목을 추가해보세요.
    </div>
    ) : (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {subjects.map((subject) => (
        <div
            key={subject.id}
            className="flex flex-col items-center justify-center border rounded-lg p-4 hover:bg-muted cursor-pointer"
        >
            <Folder className="w-[90px] h-[90px] text-primary" strokeWidth={0} fill="#f9da62" />
            <span className="text-xs md:text-sm font-bold">{subject.title}</span>
        </div>
        ))}
    </div> 
    )}
    {/* 과목 생성 */}
    <button
    onClick={() => setIsModalOpen(true)}
    className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 text-muted-foreground hover:border-primary hover:text-primary"
    >
    <span className="text-xl font-bold">+</span>
    <span className="text-sm">과목 생성</span>
    </button>
    <CreateSubject
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    onCreate={handleCreate} />
    </div>    
)};