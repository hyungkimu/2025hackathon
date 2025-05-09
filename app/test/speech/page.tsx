'use client';

import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import idleAnim from '@/public/lotties/idle.json'; 
import speekAnim from '@/public/lotties/speek.json'; 

type MicStatus = 'idle' | 'speek';

export default function SpeechRecorder() {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const lottieRef = useRef<any>(null);
  const [status, setStatus] = useState<MicStatus>('idle');

  const getAnimation = () => {
    switch (status) {
      case 'speek':
        return speekAnim;
      case 'idle':
      default:
        return idleAnim;
    }
  };

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

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      let text = "";
      let isFinal = false;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
        if (event.results[i].isFinal) isFinal = true;
      }

      setTranscript(text);

      if (isFinal) {
        const textData = new FormData();
        textData.append('text', text);

        const chat = await fetch("/api/chat", {
          method: "POST",
          body: textData,
        });

        const data = await chat.json();
        const reply = JSON.parse(data.result).reply;

        const chatData = new FormData();
        chatData.append('reply', reply);

        const res = await fetch("/api/googletts", {
          method: "POST",
          body: chatData,
        });

        const { buffer } = await res.json();
        const audio = new Audio(`data:audio/mp3;base64,${buffer}`);
        audio.play();

        setStatus('speek');
        audio.onended = () => {
          setTimeout(() => setStatus('idle'), 300);
        };
      }
    };

    recognition.onend = () => {
      if (isListening) recognition.start(); // 자동 재시작
    };

    recognitionRef.current = recognition;
  }, [isListening]);

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

      <Lottie
        lottieRef={lottieRef}
        animationData={getAnimation()}
        loop={true}
        autoplay={true}
      />
    </div>
  );
}
