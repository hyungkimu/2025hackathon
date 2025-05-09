"use client";

import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { UserInfo } from "./UserInfo";
import { SubjectList } from "./SubjectList";

type FileItemType = {
  id: number;
  name: string;
};

const dummyUser = {
  name: "남희수",
  school: "세종대학교",
  department: "소프트웨어학과",
};

const dummySubjects = [
  { id: "1", title: "문제해결및실습:JAVA" },
  { id: "2", title: "운영체제" },
  { id: "3", title: "알고리즘" },
  { id: "4", title: "컴퓨터구조" },
  { id: "5", title: "English Reading" },
  { id: "6", title: "아무튼과목" }, // overflow test
];


export default function Dashboard() {
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
    <Card className="max-w-5xl mx-auto p-6 mt-10">
        <UserInfo user = { dummyUser }></UserInfo>
        <CardContent className="p-0">
            <SubjectList subjects={dummySubjects}></SubjectList>
        </CardContent>
    </Card>
  );
}
