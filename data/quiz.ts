import db from "@/db";
import { quiz, question } from "@/db/schema";
import { eq } from "drizzle-orm";

// JSON을 파싱해서 DB에 저장
export const saveQuizToDB = async (quizJson: any) => {
  const { quizMeta, questions } = quizJson;

  // 1. 퀴즈 저장
  const [newQuiz] = await db.insert(quiz).values({
    title: quizMeta.title,
    subjectId: quizMeta.subjectId,
    timeLimitMinutes: quizMeta.timeLimitMinutes,
    description: quizMeta.description,
  }).returning();

  const quizId = newQuiz.id;

  // 2. 각 문제 저장
  await db.insert(question).values(
    questions.map((q: any, idx: number) => ({
      quizId: quizId,
      type: q.type,
      content: q.content,
      options: q.options ?? [],
      modalAnswer: q["modal answer"].toString(),
    }))
  );

  return quizId;
};
