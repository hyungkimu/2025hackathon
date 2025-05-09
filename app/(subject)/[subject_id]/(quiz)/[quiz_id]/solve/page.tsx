'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";


type QuestionType = "multiple" | "short" | "subjective"

interface QuizMeta {
    title: string       // 시험 제목
    subject: string     // 과목명
    totalQuestions: number
    timeLimitMinutes?: number // 선택적
    description?: string      // 안내 문구
}

interface Question {
    id: string
    type: QuestionType
    question: string
    options?: string[] 
}

const quizMeta: QuizMeta = {
    title: "프론트엔드 기본 퀴즈",
    subject: "웹 프로그래밍",
    totalQuestions: 10,
    timeLimitMinutes: 15,
    description: "다음 문제들을 읽고 알맞은 답을 입력하거나 선택하세요."
}

const questions: Question[] = [
    {
        id: "q1",
        type: "multiple",
        question: "HTML의 정식 명칭은?",
        options: [
          "Hyper Trainer Marking Language",
          "Hyper Text Markup Language",
          "High Text Machine Language"
        ]
      },
      {
        id: "q2",
        type: "short",
        question: "대한민국의 수도는?"
      },
      {
        id: "q3",
        type: "subjective",
        question: "JavaScript의 비동기 처리 방식에 대해 설명하시오."
      },
      {
        id: "q4",
        type: "multiple",
        question: "CSS에서 글자 색상을 지정하는 속성은?",
        options: ["font-color", "text-style", "color"]
      },
      {
        id: "q5",
        type: "subjective",
        question: "프론트엔드와 백엔드의 차이를 설명하시오."
      }
]

export default function QuizSolvePage() {

    const [answers, setAnswers] = useState<Record<string, string>>({})

    const handleChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("제출된 답안:", answers)

    // fetch("/submit", { method: "POST", body: JSON.stringify(answers) })
    }

    return (
    <div className="pl-4 pr-4 pt-14 pb-14 md:pr-0 md:pl-0 md:pt-20">
    <div className="max-w-2xl mx-autopt-7 p-5 m-auto border rounded-md bg-gray-50 shadow-sm">
        <h1 className="text-xl md:text-2xl font-bold text-primary mb-2">{quizMeta.title}</h1>
        <p className="text-sm text-gray-600">
            과목: <span className="font-medium">{quizMeta.subject}</span> | 
            총 문제 수: {quizMeta.totalQuestions}문제
        </p>
        {quizMeta.description && (
            <p className="mt-2 text-gray-700 text-sm md:text-base">{quizMeta.description}</p>
        )}
    </div>
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      {questions.map((q, index) => (
        <div key={q.id} className={`pt-[35px] pb-[35px]  space-x-2 ${index === 0 ? "border-0" : "border-t"}`}>
          <h2 className="font-semibold mb-3 text-sm md:text-lg">Q{index + 1}. {q.question}</h2>

          {q.type === "multiple" && q.options && (
            <>
              <RadioGroup
                value={answers[q.id] || ""}
                onValueChange={(v) => handleChange(q.id, v)}
                className="space-y-1 p-2 pt-0 pb-0"
              >
                {q.options.map((opt, idx) => (
                  <div className="flex items-center space-x-2" key={idx}>
                    <RadioGroupItem className="
                    rounded-full border border-gray-400
                    data-[state=checked]:text-gray-600
                    text-white
                    " id={`${q.id}-option-${idx}`} value={String(idx)} />
                    <label htmlFor={`${q.id}-option-${idx}`} className="text-sm md:text-base" >{opt}</label>
                  </div>
                ))}
              </RadioGroup>
              <input type="hidden" name={q.id} value={answers[q.id] || ""} />
            </>
          )}

          {q.type === "short" && (
            <Input
                name={q.id}
                value={answers[q.id] || ""}
                onChange={(e) => handleChange(q.id, e.target.value)}
                placeholder="정답을 입력하세요"
                className="md:text-base"
            />
          )}

          {q.type === "subjective" && (
            <Textarea
                name={q.id}
                value={answers[q.id] || ""}
                onChange={(e) => handleChange(q.id, e.target.value)}
                className="border rounded w-full md:text-base min-h-[100px]"
                placeholder="답변을 서술하세요"
            />
          )}
        </div>
      ))}

      <Button type="submit" className="w-full text-lg bg-red-500 hover:bg-red-600 md:mt-3 rounded-full">제출하기</Button>
    </form>
    </div>
    );
}
