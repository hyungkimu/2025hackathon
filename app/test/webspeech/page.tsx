"use client";
import { useEffect, useRef, useState } from "react";

export default function SpeechRecorder() {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      typeof window !== "undefined" &&
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

    if (!SpeechRecognition) {
      alert("이 브라우저는 음성 인식을 지원하지 않습니다.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let text = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      console.log(text);

      setTranscript(text);
    };

    recognition.onend = () => {
      if (isListening) recognition.start(); // 끊기면 다시 시작
    };

    console.log(transcript);
    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="font-bold mb-2">🎙 실시간 음성 인식</h2>
      <button
        onClick={isListening ? stopListening : startListening}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isListening ? "중지" : "시작"}
      </button>

      <div className="mt-4 p-2 border rounded bg-gray-100 min-h-[100px]">
        <p>{transcript || "말씀하시면 여기에 표시됩니다."}</p>
      </div>
    </div>
  );
}
