'use client';

import { useRef, useState } from 'react';
import Lottie from 'lottie-react';
import idleAnim from '@/public/lotties/idle.json'; 
import speekAnim from '@/public/lotties/speek.json'; 


type MicStatus = 'idle' | 'speek' | 'responding';

export default function RecorderButton() {
  
  const [recording, setRecording] = useState(false);
  const lottieRef = useRef<any>(null);

  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

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

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;

    audioChunks.current = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunks.current.push(e.data);
      }
    };

    lottieRef.current?.play();

    recorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

      // 서버로 업로드
      const formData = new FormData();
      formData.append("file", audioBlob, "recording.webm");
      
      const stt = await fetch("/api/voice-to-text", {
        method: "POST",
        body: formData,
      });

      const { text } = await stt.json();
      
      const textData = new FormData();
      textData.append('text', text);

      console.log(text);
    
      const chat = await fetch("/api/chat", {
          method: "POST",
          body: textData,
      });

      const data = await chat.json();

      if (!chat.ok) {
        alert(data.error || "서버 오류");
        return;
      }

      const chatData = new FormData();
      chatData.append('reply', JSON.parse(data.result).reply);
      console.log( JSON.parse(data.result).reply );

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
    };

    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();

    setRecording(false);
  };

  return (
    <div className="p-4">
      <Lottie
          lottieRef={lottieRef}
          animationData={getAnimation()}
          loop={true}
          autoplay={true}
      />
      <button
        onClick={recording ? stopRecording : startRecording}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        {recording ? "녹음 중지" : "녹음 시작"}
      </button>

      {audioUrl && (
        <div>
            <audio controls className="mt-4">
            <source src={audioUrl} type="audio/webm" />
            </audio>
            <button
                onClick={recording ? stopRecording : startRecording}
                className="bg-blue-500 text-white py-2 px-4 rounded">
            </button>
        </div>
      )}

    </div>
  );
}
