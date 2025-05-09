"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function QuizFileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [multipleCount, setMultipleCount] = useState(3);
  const [shortCount, setShortCount] = useState(2);
  const [subjectiveCount, setSubjectiveCount] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const incomingFiles = Array.from(e.target.files);
    setFiles((prev) => {
      const existingNames = new Set(prev.map((f) => f.name));
      const filtered = incomingFiles.filter((f) => !existingNames.has(f.name));
      return [...prev, ...filtered];
    });
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const isImage = (file: File) => file.type.startsWith("image");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return;

    setLoading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));
    formData.append("subject", "더카페24");
    formData.append("multipleCount", multipleCount.toString());
    formData.append("shortCount", shortCount.toString());
    formData.append("subjectiveCount", subjectiveCount.toString());

    const prepare_res = await fetch("/api/quiz/prepare", {
      method: "POST",
      body: formData,
    });

    const prepare_data = await prepare_res.json();
    setLoading(false);

    if (!prepare_res.ok) {
      alert(prepare_data.error || "서버 오류");
      return;
    }

    formData.append("prepare_data", JSON.stringify(prepare_data.combinedText));

    const res = await fetch("/api/quiz/generator", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(data.error || "서버 오류");
      return;
    }

    setResult(data.result || "응답 없음");

  };

  return (
    <>
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 space-y-6">
        <div
          className={cn(
            "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center",
            "hover:border-blue-400 transition-colors bg-white cursor-pointer"
          )}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <p className="text-sm text-gray-500">파일 또는 이미지를 선택하려면 클릭하세요</p>
          <Input
            id="file-input"
            type="file"
            multiple
            accept=".pdf,.docx,image/*"
            className="hidden"
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">객관식</label>
            <Input type="number" value={multipleCount} onChange={(e) => setMultipleCount(+e.target.value)} min={0} />
          </div>
          <div>
            <label className="text-sm font-medium">주관식</label>
            <Input type="number" value={shortCount} onChange={(e) => setShortCount(+e.target.value)} min={0} />
          </div>
          <div>
            <label className="text-sm font-medium">서술형</label>
            <Input type="number" value={subjectiveCount} onChange={(e) => setSubjectiveCount(+e.target.value)} min={0} />
          </div>
        </div>

        {files.length > 0 && (
          <Table className="bg-gray-50 rounded border">
            <TableHeader>
              <TableRow>
                <TableHead className="h-10">파일</TableHead>
                <TableHead className="h-10">삭제</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file, i) => {
                const previewUrl = isImage(file) ? URL.createObjectURL(file) : null;
                return (
                  <TableRow key={i}>
                    <TableCell className="p-2 px-4">
                      <p onClick={() => previewUrl ? setPreviewImage(previewUrl) : undefined}>{file.name}</p>
                    </TableCell>
                    <TableCell className="text-right p-2 px-4" >
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="h-8"
                        onClick={() => removeFile(i)}
                      >
                        삭제
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}

        {files.length > 0 && (
          <div className="text-right">
            <Button type="submit" disabled={loading} className="bg-blue-600 text-white">
              {loading ? "처리 중..." : "문제 생성"}
            </Button>
          </div>
        )}

        {result && (
          <div className="mt-6 p-4 border rounded bg-gray-50 whitespace-pre-wrap text-sm max-h-[400px] overflow-auto">
            <h3 className="font-semibold mb-2">📄 추출 결과</h3>
            {result}
          </div>
        )}
      </form>
    </>
  );
}
