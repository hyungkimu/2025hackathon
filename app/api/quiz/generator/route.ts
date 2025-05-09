
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(req: NextRequest) {
    const form = await req.formData();
    const files = form.getAll("file") as File[];
    const multipleCount = form.get("multipleCount")?.toString() || "0";
    const shortCount = form.get("shortCount")?.toString() || "0";
    const subjectiveCount = form.get("subjectiveCount")?.toString() || "0";
    const prepareDataRaw  = form.get("prepare_data")?.toString();
    const prepareData = prepareDataRaw ? JSON.parse(prepareDataRaw) : null;
    const subject = form.get("subject")?.toString();
    
    const toBase64 = async (file: File) => {
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString("base64");
        return `data:${file.type};base64,${base64}`;
    };

    const base64Images = await Promise.all(
        files.filter((file) => file.type.startsWith("image")).map(toBase64)
    );


    let messages = [
        {
            role: "user",
            content: [
            {
                type: "text",
                text: `
                다음 파일 내용을 기반으로 JSON 형식의 퀴즈를 생성해주세요.

                출력 형식:
                {
                "quizMeta": {
                    "title": "퀴즈 제목, 과목명과 생성된 퀴즈를 적절히 조화시켜 적절한 제목을 생성하시오",
                    "totalQuestions": 총 문제 수 (정수),
                    "timeLimitMinutes": 제한 시간 (정수),
                    "description": "퀴즈에 대한 간단한 설명"
                },
                "questions": [
                    {
                    "type": "multiple", // 객관식: multiple, 주관식: short, 서술형: subjective
                    "question": "문제 내용",
                    "options": ["보기1", "보기2", "보기3", "보기4", "보기5"], // 객관식일 때만 포함 
                    "modal answer": 정답 // 객관식은 정수 인덱스(1부터), 주관식/서술형은 문자열
                    },
                    ...
                ]
                }

                생성 조건:
                - 객관식: ${multipleCount}개
                - 주관식: ${shortCount}개
                - 서술형: ${subjectiveCount}개
                - 과목명: ${subject}

                단, JSON 이외의 텍스트는 포함하지 마세요.
                `
            },
            ],
        },
    ];

    prepareData.forEach(element => {
        for (const [key, value] of Object.entries(element)) {
            if (key === "text" && value) {
            messages[0].content.push({
                type: "text",
                text: value,
            });
            } else if (key === "image" && value) {
            messages[0].content.push({
                type: "image_url",
                image_url: { url: value },
            });
            }
        }
    });



    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages,
        max_tokens: 1000,
    });

    const text = completion.choices[0].message.content;

    return NextResponse.json({ result: text });

}
