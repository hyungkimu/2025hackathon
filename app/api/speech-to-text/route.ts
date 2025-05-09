// app/api/speech-to-text/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { IncomingForm } from "formidable";
import fs from "fs/promises";
import { Readable } from "stream";
import type { IncomingMessage } from "http";

// OpenAI 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Web → Node.js 변환
function toNodeRequest(req: NextRequest): IncomingMessage {
  const readable = Readable.fromWeb(req.body as any) as IncomingMessage;
  readable.headers = Object.fromEntries(req.headers.entries());
  readable.method = req.method;
  return readable;
}

export async function POST(req: NextRequest) {
  const nodeReq = toNodeRequest(req);
  const form = new IncomingForm({ keepExtensions: true });

  const { files }: any = await new Promise((resolve, reject) => {
    form.parse(nodeReq, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

  const audio = files?.audio;
  if (!audio) {
    return NextResponse.json({ error: "No audio file uploaded" }, { status: 400 });
  }

  const fileData = await fs.readFile(audio.filepath);

  const fileBlob = new Blob([fileData], { type: audio.mimetype });

  const transcription = await openai.audio.transcriptions.create({
    file: fileBlob as any, // Node.js 환경에서는 FormData + Blob이 필요
    model: "whisper-1",
    response_format: "json",
    prompt: `Don't filter out interjections such as 'uh', 'um', 'hmm', and similar sounds.
    Transcribe user speech accurately, including moments when the user corrects themselves, hesitates, or uses filler words. This design should ensure that all aspects of spoken dialogue, including revisions and thinking pauses, are captured without filtering.
    User's speech is in English.`,
  });
  return NextResponse.json({
    result: transcription.text,
  });
}
