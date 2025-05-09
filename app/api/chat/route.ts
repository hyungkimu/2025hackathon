import { PROMPT } from "@/constants/prompt";
import { Message, streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const openai = new OpenAI();

export async function POST(req: NextRequest) {
    const form = await req.formData();
    const text = form.get('text')?.toString();
    const history = form.get('history')?.toString();

    
    let messages: Message[] = [];

    try {
        messages = JSON.parse(history || '[]');
    } catch {
        console.warn('📛 history 파싱 실패');
    }

    const result = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {role: "system", content: PROMPT},
            ...messages,
            {
            role: "user",
            content: text || "",
            },
        ],
        temperature: 0.5,
        stream: true, 
    });

    let fullText = '';

    for await (const chunk of result) {
    const delta = chunk.choices[0]?.delta?.content;
    if (delta) {
        fullText += delta;
    }
    }
    
    console.log(fullText);

    return NextResponse.json({ result: fullText });
}
