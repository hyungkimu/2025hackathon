"use client";

import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { SubjectInfo } from "./SubjectInfo";
import { QuizList } from "./QuizList";

const dummySubject = {
  title: "문제해결및실습:JAVA",
};

const dummyQuizzes = [
  {
    id: "1",
    title: "제로음료 상식 테스트",
    description: "제로음료 관련 상식을 테스트해보세요.",
    totalQuestions: 10,
    status: "correct",
  },
  {
    id: "2",
    title: "커피의 역사",
    description: "커피가 어떻게 전 세계로 퍼졌는지 알아보는 퀴즈입니다.",
    totalQuestions: 8,
    status: "partial",
  },
  {
    id: "3",
    title: "카페24 메뉴별 칼로리",
    description: "메뉴별 칼로리를 정확히 알고 있나요?",
    totalQuestions: 5,
    status: "unsubmitted",
  },
];

export default function Subject() {
  return (
    <Card className="max-w-5xl mx-auto p-6 mt-10">
        <SubjectInfo subject = { dummySubject }></SubjectInfo>
        <CardContent className="p-0">
            <QuizList quizs={dummyQuizzes}></QuizList>
        </CardContent>
    </Card>
  );
}
