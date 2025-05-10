"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useRouter } from "next/navigation";

export type DiaryItem = {
  id: string;
  userId: string;
  date: string;
  image_url: string;
  title: string;
  content: string | null;
  chat: { id: string; sender: "me" | "other"; message: string }[];
};

export function DrawCard({ diaryData }: { diaryData: DiaryItem[] }) {
  const router = useRouter(); // 라우터 사용
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  console.log(diaryData);

  const diary = diaryData[index];
  const content = diary.content.split("\n");

  useEffect(() => {
    if (!fade) {
      const timeout = setTimeout(() => setFade(true), 500);
      return () => clearTimeout(timeout);
    }
  }, [fade]);

  const handleChange = (direction: "prev" | "next") => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) =>
        direction === "prev"
          ? Math.max(0, prev - 1)
          : Math.min(diaryData.length - 1, prev + 1)
      );
      setFade(true);
    }, 1000);
  };

  return (
    <Tabs defaultValue="account" className="w-[400px] m-auto relative">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">그림일기</TabsTrigger>
        <TabsTrigger value="password">대화내역</TabsTrigger>
      </TabsList>

      <div
        key={diary.id}
        className={`transition-opacity duration-300 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <TabsContent value="account">
          <Card className="border-2 border-gray-200">
            <CardHeader className="relative">
              <CardTitle className="text-3xl text-center font-dagyeong">
                {diary.date}
              </CardTitle>
              <button
                onClick={() => router.push(`/diary/${diaryData[0].userId}`)} // 이동할 경로 설정
                className="absolute top-0 left-1.5 mt-2 mr-2 px-3 py-1 text-sm rounded-md border bg-white hover:bg-gray-100"
              >
                전체 목록
              </button>
              <div className="w-full aspect-square relative rounded overflow-hidden mt-4">
                <Image
                  src={diary.image_url}
                  alt="그림일기 이미지"
                  fill
                  className="object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-2 mt-3">
              <ul>
                {content.map((line, idx) => (
                  <li key={idx}>
                    <p className="relative inline-block mb-2 text-xl font-naduri_l tracking-wide">
                      {line}
                    </p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card className="border-2 border-gray-200 h-[500px] flex flex-col">
            <CardHeader className="border-b p-4">
              <CardTitle className="text-xl">{diary.date} 대화 내역</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto px-4 py-7 pb-10 space-y-2">
              <div className="flex flex-col">
                {diary.chat.map((chat) => (
                  <div
                    key={chat.id}
                    className={`max-w-[70%] px-4 py-3 my-2 rounded-lg shadow text-gray-800 ${
                      chat.sender === "me"
                        ? "self-end bg-blue-100"
                        : "self-start bg-gray-100"
                    }`}
                  >
                    {chat.message}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </div>

      {/* Prev / Next 버튼 */}
      <button
        onClick={() => handleChange("prev")}
        aria-label="이전 그림일기"
        disabled={index === 0}
        className={`absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full border border-gray-300 bg-white shadow flex items-center justify-center transition hover:bg-gray-100 ${
          index === 0 ? "opacity-30 cursor-not-allowed" : "hover:scale-110"
        }`}
      >
        <ChevronLeft className="w-10 h-10 mr-1" strokeWidth={1} />
      </button>
      <button
        onClick={() => handleChange("next")}
        aria-label="다음 그림일기"
        disabled={index === diaryData.length - 1}
        className={`absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full border border-gray-300 bg-white shadow flex items-center justify-center transition hover:bg-gray-100 ${
          index === diaryData.length - 1
            ? "opacity-30 cursor-not-allowed"
            : "hover:scale-110"
        }`}
      >
        <ChevronRight className="w-10 h-10 ml-1" strokeWidth={1} />
      </button>
    </Tabs>
  );
}
