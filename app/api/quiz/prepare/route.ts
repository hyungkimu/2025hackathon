// app/api/quiz/prepare/route.ts

import { NextRequest, NextResponse } from "next/server";
import { IncomingForm, Files, File as FormidableFile } from "formidable";
import fs from "fs/promises";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import path from "path";
import { Readable } from "stream";
import type { IncomingMessage } from "http";

// App Router에서는 Web Request → Node.js Request로 변환이 필요함
function toNodeRequest(req: NextRequest): IncomingMessage {
  const readable = Readable.fromWeb(req.body as any) as unknown as IncomingMessage;
  readable.headers = Object.fromEntries(req.headers.entries());
  readable.method = req.method;
  return readable;
}

export async function POST(req: NextRequest) {
  try {
    const form = new IncomingForm({ keepExtensions: true, multiples: true });
    const nodeReq = toNodeRequest(req);

    const { fields, files }: { fields: Record<string, any>; files: Files } = await new Promise((resolve, reject) => {
      form.parse(nodeReq, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const rawFiles = files?.file;
    if (!rawFiles) {
      return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
    }

    const fileArray = Array.isArray(rawFiles) ? rawFiles : [rawFiles];
    const allTexts = [];

    for (const file of fileArray) {
      const ext = path.extname(file.originalFilename || "").toLowerCase();
      const buffer = await fs.readFile(file.filepath);

      if (ext === ".pdf") {
        const pdf = await pdfParse(buffer);
        allTexts.push( { "text" : pdf.text });
      } else if (ext === ".docx") {
        const docx = await mammoth.extractRawText({ buffer });
        allTexts.push( { "text" : docx.value });
      } else if (ext.startsWith(".png") || ext.startsWith(".jpg") || ext.startsWith(".jpeg")) {
        // 이미지는 Base64 문자열로 변환
        const base64 = buffer.toString("base64");
        allTexts.push({ "image" : `data:${file.mimetype};base64,${base64}` } ); // GPT에 전달할 때 프리픽스로 처리
      }
    }

    return NextResponse.json({ combinedText: allTexts });
  } catch (err) {
    console.error("파일 처리 실패:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
