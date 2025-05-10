// app/api/tts/route.ts (Next.js 13 이상 기준)
import { NextRequest, NextResponse } from "next/server";
import textToSpeech from "@google-cloud/text-to-speech";
import { readFile } from "fs/promises";
import path from "path";

// 서비스 계정 키 경로
const keyPath = path.join(
  process.cwd(),
  process.env.GOOGLE_APPLICATION_CREDENTIALS || ""
);

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const text = form.get("reply")?.toString();

  if (!text) {
    return NextResponse.json({ error: "텍스트 없음" }, { status: 400 });
  }

  const client = new (textToSpeech.TextToSpeechClient as any)({
    keyFilename: keyPath,
  });

  const [response] = await client.synthesizeSpeech({
    input: { text },
    voice: {
      languageCode: "ko-KR",
      name: "ko-KR-Standard-A", // 남성: A~D (여성: E~H)
    },
    audioConfig: { audioEncoding: "MP3" },
  });

  const buffer = response.audioContent?.toString("base64");

  return NextResponse.json({ buffer });
}
