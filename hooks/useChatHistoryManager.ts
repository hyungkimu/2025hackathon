// hooks/useChatHistoryManager.ts
import { useEffect, useRef, useState } from "react";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  createdAt: string; // 추가
  emotion?: string;
  risk?: number;
};

export function useChatHistoryManager(conversationId: string) {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const lastSavedIndex = useRef(0);
  const isSaving = useRef(false);

  useEffect(() => {
    const unsaved = history.slice(lastSavedIndex.current);
    if (unsaved.length >= 10 && !isSaving.current) {
      isSaving.current = true;

      fetch("/api/saveHistory", {
        method: "POST",
        body: JSON.stringify({
          conversationId,
          messages: unsaved,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then(() => {
          lastSavedIndex.current = history.length;
        })
        .finally(() => {
          isSaving.current = false;
        });
    }
  }, [history, conversationId]);

  const addMessages = (msgs: ChatMessage[]) => {
    setHistory((prev) => [...prev, ...msgs]);
  };

  return {
    history,
    addMessages,
  };
}
