import { relations } from "drizzle-orm";
import { pgTable, uuid, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";

// User Table
export const user = pgTable("user", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
  subjects: many(subject),
  submissions: many(submission),
}));

// Subject Table
export const subject = pgTable("subject", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  title: text("title").notNull(),
  userId: uuid("user_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const subjectRelations = relations(subject, ({ one, many }) => ({
  user: one(user, { fields: [subject.userId], references: [user.id] }),
  quizzes: many(quiz),
}));

// Quiz Table
export const quiz = pgTable("quiz", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  subjectId: uuid("subject_id").references(() => subject.id, { onDelete: "cascade" }).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  timeLimitMinutes: integer("time_limit_minutes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quizRelations = relations(quiz, ({ one, many }) => ({
  subject: one(subject, { fields: [quiz.subjectId], references: [subject.id] }),
  questions: many(question),
  submissions: many(submission),
}));

// Question Table
export const question = pgTable("question", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  quizId: uuid("quiz_id").references(() => quiz.id, { onDelete: "cascade" }).notNull(),
  type: text("type").notNull(), // "multiple" | "short" | "subjective"
  content: text("content").notNull(),
  options: text("options").array(),
});

export const questionRelations = relations(question, ({ one, many }) => ({
  quiz: one(quiz, { fields: [question.quizId], references: [quiz.id] }),
  answers: many(answer),
}));

// Answer Table (모범답안)
export const answer = pgTable("answer", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  questionId: uuid("question_id").references(() => question.id, { onDelete: "cascade" }).notNull(),
  content: text("content").notNull(),
});

export const answerRelations = relations(answer, ({ one }) => ({
  question: one(question, { fields: [answer.questionId], references: [question.id] }),
}));

// Submission Table
export const submission = pgTable("submission", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  quizId: uuid("quiz_id").references(() => quiz.id, { onDelete: "cascade" }).notNull(),
  userId: uuid("user_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
  score: integer("score"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const submissionRelations = relations(submission, ({ one, many }) => ({
  quiz: one(quiz, { fields: [submission.quizId], references: [quiz.id] }),
  user: one(user, { fields: [submission.userId], references: [user.id] }),
  answers: many(submissionAnswer),
}));

// SubmissionAnswer Table
export const submissionAnswer = pgTable("submission_answer", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  submissionId: uuid("submission_id").references(() => submission.id, { onDelete: "cascade" }).notNull(),
  questionId: uuid("question_id").references(() => question.id, { onDelete: "cascade" }).notNull(),
  userAnswer: text("user_answer").notNull(),
  isCorrect: boolean("is_correct"),
});

export const submissionAnswerRelations = relations(submissionAnswer, ({ one }) => ({
  submission: one(submission, { fields: [submissionAnswer.submissionId], references: [submission.id] }),
  question: one(question, { fields: [submissionAnswer.questionId], references: [question.id] }),
}));