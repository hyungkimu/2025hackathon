import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { writeFile } from "fs/promises";
import path from "path";

const openai = new OpenAI();

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    //const buffer = Buffer.from(await file.arrayBuffer());
    //const filePath = path.join("/tmp", `${Date.now()}.webm`);
    //await writeFile(filePath, buffer);

    const transcription = await openai.audio.transcriptions.create({
        file: file,
        model: "whisper-1",
        response_format: "json",
        temperature: 0.5,
    });

    return NextResponse.json({ text: transcription.text });
}
