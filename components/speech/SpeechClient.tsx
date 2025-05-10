"use client";

import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import { Mic } from "lucide-react";
import idleAnim from "@/src/assets/lotties/idle.json";
import speekAnim from "@/src/assets/lotties/speak.json";
import happyAnim from "@/src/assets/lotties/happy.json";
import sadAnim from "@/src/assets/lotties/sad.json";
import heartAnim from "@/src/assets/lotties/heart.json";
import awkwardAnim from "@/src/assets/lotties/awkward.json";
import surprisedAnim from "@/src/assets/lotties/surprised.json";
import angryAnim from "@/src/assets/lotties/angry.json";
import { useChatHistoryManager } from "@/hooks/useChatHistoryManager";
import { redirect, useRouter } from "next/navigation";
import { getDiary, getOrCreateDiaryId } from "@/data/diary";
import { format } from "date-fns";

type MicStatus =
  | "idle"
  | "neutral"
  | "happy"
  | "sad"
  | "heartwarming"
  | "awkward"
  | "surprised"
  | "angry";

export default function SpeechClient({
  userId,
  DiaryId,
}: {
  userId: string;
  DiaryId: string;
}) {
  const [transcript, setTranscript] = useState("");
  const [status, setStatus] = useState<MicStatus>("idle");
  const { history, addMessages } = useChatHistoryManager(DiaryId);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isRecordingRef = useRef(false);
  const hasProcessedRef = useRef(false);
  const lottieRef = useRef<any>(null);
  const router = useRouter();

  const handleDrawDiary = async () => {
    const ttsForm = new FormData();
    ttsForm.append(
      "reply",
      "오늘 대화도 너무 즐거웠어요, 다음에 또 같이 대화해요!"
    );
    setStatus("happy");
    const ttsRes = await fetch("/api/googletts", {
      method: "POST",
      body: ttsForm,
    });

    const { buffer } = await ttsRes.json();
    const audio = new Audio(`data:audio/mp3;base64,${buffer}`);
    audio.play();

    audio.onended = async () => {
      console.log(DiaryId);

      try {
        const form = new FormData();
        form.append("diaryId", DiaryId);
        form.append("history", JSON.stringify(history));

        const res = await fetch("/api/diary/generate", {
          method: "POST",
          body: form,
        });

        const { spokenSummary } = await res.json();
        console.log(spokenSummary);

        const imageForm = new FormData();
        imageForm.append("spokenSummary", spokenSummary);
        imageForm.append("diaryId", DiaryId);
        imageForm.append("userId", userId);
        const date = await fetch("/api/diary/image", {
          method: "POST",
          body: imageForm,
        });

        // 결과 페이지로 이동 (다이어리 날짜와 사용자 ID를 사용)
        const dateStr = format(new Date(history[0].createdAt), "yyyy-MM-dd"); // 또는 서버에서 받은 날짜 사용

        console.log(dateStr);
        router.push(`/diary/${userId}/${dateStr}`); // 날짜 경로로 리다이렉트

        // 결과 페이지로 이동 <<
      } catch (e) {
        console.error("그림일기 생성 실패:", e);
        alert("그림일기를 만드는 중 문제가 생겼어요.");
      }
    };
  };

  const getAnimation = () => {
    switch (status) {
      case "neutral":
        return speekAnim;
      case "happy":
        return happyAnim;
      case "sad":
        return sadAnim;
      case "heartwarming":
        return heartAnim;
      case "awkward":
        return awkwardAnim;
      case "surprised":
        return surprisedAnim;
      case "angry":
        return angryAnim;
      case "idle":
      default:
        return idleAnim;
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("이 브라우저는 음성 인식을 지원하지 않습니다.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => {
      isRecordingRef.current = true;
    };

    recognition.onend = () => {
      isRecordingRef.current = false;
    };

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      if (hasProcessedRef.current) return;

      let finalText = "";
      let isFinal = false;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        finalText += event.results[i][0].transcript;
        if (event.results[i].isFinal) isFinal = true;
      }

      setTranscript(finalText);

      if (!isFinal) return;
      hasProcessedRef.current = true;

      setStatus("responding");

      try {
        const chatForm = new FormData();
        chatForm.append("text", finalText);
        chatForm.append("history", JSON.stringify(history));

        const chatRes = await fetch("/api/chat", {
          method: "POST",
          body: chatForm,
        });

        const { result } = await chatRes.json();

        // ✅ JSON 안전 파싱
        let parsed;
        try {
          const match = result.match(/\{[\s\S]*\}/);
          if (match) parsed = JSON.parse(match[0]);
        } catch (e) {
          console.warn("JSON 파싱 실패:", e);
        }

        const fallbackReply = result; // 그냥 텍스트일 때 쓸 대체 응답

        const reply = parsed?.reply || fallbackReply;
        const emotion = parsed?.emotion || "neutral";
        const risk = parsed?.risk ?? 1;

        const ttsForm = new FormData();
        ttsForm.append("reply", reply);

        const ttsRes = await fetch("/api/googletts", {
          method: "POST",
          body: ttsForm,
        });

        const { buffer } = await ttsRes.json();
        const audio = new Audio(`data:audio/mp3;base64,${buffer}`);
        audio.play();

        setStatus(emotion as MicStatus);
        audio.onended = () => {
          setTimeout(() => setStatus("idle"), 300);
          const now = new Date().toISOString();
          addMessages([
            {
              role: "user",
              content: finalText,
              createdAt: now,
              emotion,
              risk,
            },
            {
              role: "assistant",
              content: reply,
              createdAt: now,
              emotion,
              risk,
            },
          ]);
        };
      } catch (error) {
        console.error(error);
        setStatus("idle");
      }
    };

    recognition.onerror = (e: any) => {
      console.error(e);
      setStatus("idle");
    };

    recognitionRef.current = recognition;
  }, [history]);

  const startRecognition = () => {
    if (!recognitionRef.current) return;
    if (isRecordingRef.current) return;

    try {
      recognitionRef.current.start();
      hasProcessedRef.current = false;
    } catch (err: any) {
      if (err.name === "InvalidStateError") {
        console.warn("이미 실행 중입니다.");
      } else {
        console.error("startRecognition 오류:", err);
      }
    }
  };

  const stopRecognition = () => {
    if (!recognitionRef.current || !isRecordingRef.current) return;
    recognitionRef.current.stop();
  };

  return (
    <div className="relative h-screen w-full bg-gray-50">
      {/* 애니메이션 */}
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-96 aspect-auto ">
        <Lottie
          lottieRef={lottieRef}
          animationData={getAnimation()}
          loop
          autoplay
        />
      </div>

      {/* 인식된 텍스트 */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded shadow">
        {transcript ? (
          <p className="text-gray-800 text-sm flex">
            <span>🗣️</span> {transcript}
          </p>
        ) : (
          <p className="text-gray-400 text-sm">
            버튼을 꾹 누르면 인식이 시작됩니다
          </p>
        )}
      </div>

      {/* 마이크 버튼 */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2">
        <button
          className="p-4 bg-red-500 text-white rounded-full shadow-md active:scale-95 transition"
          onMouseDown={startRecognition}
          onMouseUp={stopRecognition}
          onMouseLeave={stopRecognition}
          onTouchStart={startRecognition}
          onTouchEnd={stopRecognition}
        >
          <Mic className="w-8 h-8" />
        </button>
      </div>

      {history.length >= 0 && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50">
          <button
            onClick={handleDrawDiary}
            className="px-5 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition animate-pulse"
          >
            📸 지금까지 이야기로 그림일기 만들기
          </button>
        </div>
      )}
    </div>
  );
}
