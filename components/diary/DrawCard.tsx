'use client'
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Image from "next/image"


const diaryData = [
    {
      id: "1",
      date: "2025-03-01",
      image_url: "/diary.jpg",
      title: "손녀랑 함께 한강에 간 하루",
      content:
        "손녀딸과 함께 한강 나들이를 다녀왔다.\n 아름다운 풍경 속에서 손녀와 추억을 많이 쌓았다.\n 시원한 강바람이 참 좋았고 한가로운 오후를 보냈다.\n 이런 시간을 더 자주 가져야겠다고 다짐했다.",
      chat: [
        { id: 1, sender: "other", message: "할머니, 오늘 뭐 하셨어요?" },
        { id: 2, sender: "me", message: "집에 있었다." },
        { id: 3, sender: "other", message: "밥은 드셨어요?" },
        { id: 4, sender: "me", message: "된장찌개 끓여서 먹었다." },
      ],
    },
    {
      id: "2",
      date: "2025-03-02",
      image_url: "/diary.jpg",
      title: "비 오는 날의 나들이",
      content:
        "비가 오는 날이었다.\n우산을 쓰고 공원을 천천히 걸었다.\n조용하고 촉촉한 공기가 마음에 들었다.\n이런 날도 나쁘지 않다 생각했다.\n",
      chat: [
        { id: 1, sender: "other", message: "오늘은 나가셨어요?" },
        { id: 2, sender: "me", message: "비 오는데 나갔다." },
      ],
    },
    {
      id: "3",
      date: "2025-03-03",
      image_url: "/diary.jpg",
      title: "시장 구경",
      content:
        "아침 일찍 시장에 갔다.\n싱싱한 채소와 생선을 사서 기분이 좋았다.\n아는 사람도 만나 인사도 나눴다.\n활기찬 하루였다.\n",
      chat: [
        { id: 1, sender: "other", message: "시장 뭐 사셨어요?" },
        { id: 2, sender: "me", message: "생선이랑 채소." },
      ],
    },
];

export function DrawCard() {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);

    const diary = diaryData[index];
    const content = diary.content.split("\n");
  
    useEffect(() => {
        if (!fade) {
            const timeout = setTimeout(() => {
            setFade(true);
            }, 500); // 너무 늦으면 트랜지션이 먹지 않음
            return () => clearTimeout(timeout);
        }
    }, [fade]);  
    
    
    
    const handleChange = (direction: "prev" | "next") => {
        // 먼저 페이드아웃
        setFade(false);
    
        // 페이드아웃이 적용될 수 있게 잠깐 기다림 (300ms = transition-duration과 일치)
        setTimeout(() => {
        setIndex((prev) =>
            direction === "prev" ? Math.max(0, prev - 1) : Math.min(diaryData.length - 1, prev + 1)
        );
        setFade(true); // 페이드인
        }, 1000);
    };


    const prev = () => {
      if (index > 0) setIndex(index - 1);
    };
  
    const next = () => {
      if (index < diaryData.length - 1) setIndex(index + 1);
    };
  
    return (
    <Tabs defaultValue="account" className="w-[400px] m-auto relative">
    <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">그림일기</TabsTrigger>
        <TabsTrigger value="password">대화내역</TabsTrigger>
    </TabsList>

    <div key={diary.id} className={`transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}>
    <TabsContent value="account">

        <Card
        className="border-2 border-gray-200 transition-all duration-500 ease-in-out"
        key={diary.id}
        >
        <CardHeader>
            <CardTitle className="text-xl text-center text-3xl font-dagyeong tracking-wide mb-1">
            {diary.date}
            </CardTitle>
            <div className="w-full aspect-square relative rounded overflow-hidden">
            <Image
                src={diary.image_url}
                alt="그림일기 이미지"
                fill
                className="object-cover"
            />
            </div>
        </CardHeader>
        <CardContent className="space-y-2">
            <h2 className="text-2xl font-naduri_b tracking-wide mb-3">
            제목: {diary.title}
            </h2>
            <ul className="flex flex-col">
            {content.map(
                (element, idx) =>
                element && (
                    <li key={idx}>
                    <p
                        className="
                        relative inline-block
                        before:absolute before:left-[0%] before:-bottom-[2px]
                        before:w-[100%] before:h-[40%] before:-skew-[12deg] before:-translate-x-[0%]
                        before:bg-[rgba(238,87,87,0.1)]
                        before:border-b-2 before:border-b-gray-200
                        mb-2 text-xl font-naduri_l tracking-wide
                    "
                    >
                        {element}
                    </p>
                    </li>
                )
            )}
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
                chat.sender === "me" ? "self-end bg-blue-100" : "self-start bg-gray-100"
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
    {/* 왼쪽 버튼 */}
    <button
    onClick={() => handleChange("prev")}
    aria-label="이전 그림일기"
    disabled={index === 0}
    className={`
        absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 
        w-14 h-14 rounded-full border border-gray-300 bg-white shadow
        flex items-center justify-center
        transition hover:bg-gray-100
        ${index === 0 ? "opacity-30 cursor-not-allowed" : "hover:scale-110"}
    `}
    >
    <ChevronLeft className="w-10 h-10 mr-1" strokeWidth={1} />
    </button>

    {/* 오른쪽 버튼 */}
    <button
    onClick={() => handleChange("next")}
    aria-label="다음 그림일기"
    disabled={index === diaryData.length - 1}
    className={`
        absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 z-10 
        w-14 h-14 rounded-full border border-gray-300 bg-white shadow
        flex items-center justify-center
        transition hover:bg-gray-100
        ${index === diaryData.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:scale-110"}
    `}
    >
    <ChevronRight className="w-10 h-10 ml-1" strokeWidth={1} />
    </button>
    </Tabs>
  )
}
