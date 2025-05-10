// global.d.ts
export {};

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }

  type SpeechRecognition = any;
  type SpeechRecognitionEvent = any;
}
