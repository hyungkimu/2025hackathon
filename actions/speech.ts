import { useCallback, useEffect, useState } from "react";

export default function Main() {
    const [recording, setRecording] = useState(false);
    const [audioURL, setAudioURL] = useState("");
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
      null,
    );
   
    useEffect(() => {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
   
        recorder.ondataavailable = (event) => {
          setAudioURL(URL.createObjectURL(event.data));
        };
      });
    }, []);
   
    const startRecording = () => {
      if (mediaRecorder) {
        mediaRecorder.start();
        setRecording(true);
      }
    };
   
    const stopRecording = useCallback(() => {
      if (mediaRecorder) {
        mediaRecorder.stop();
        setRecording(false);
      }
    }, [mediaRecorder]);
  }