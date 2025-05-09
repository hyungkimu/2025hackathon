import { pgTable, uuid, text, integer, timestamp, date, unique } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// 관리자 테이블
export const admin = pgTable("admin", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

// 어르신 테이블
export const senior = pgTable("senior", {
  id: uuid("id").defaultRandom().primaryKey(),
  adminId: uuid("admin_id").references(() => admin.id, { onDelete: "cascade" }).notNull(),
  seniorId: text("senior_id").notNull().unique(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  guardianPhone: text("guardian_phone").notNull(),
  address: text("address").notNull(),
});

export const seniorRelations = relations(senior, ({ many, one }) => ({
  diaries: many(diary),
  admin: one(admin, { fields: [senior.adminId], references: [admin.id] }),
}));

// 그림일기 테이블
export const diary = pgTable("diary", {
  id: uuid("id").defaultRandom().primaryKey(),
  seniorId: uuid("senior_id").references(() => senior.id, { onDelete: "cascade" }).notNull(),
  title: text("title"),
  imageUrl: text("image_url"),
  risk: integer("risk"),
  createdAt: date("created_at").defaultNow(),
}, (table) => ({
  uniqueDiaryPerDay: unique().on(table.seniorId, table.createdAt),
}));

export const diaryRelations = relations(diary, ({ one, many }) => ({
  senior: one(senior, { fields: [diary.seniorId], references: [senior.id] }),
  messages: many(diaryMessage),
}));

// 일기 메시지 테이블
export const diaryMessage = pgTable("diary_message", {
  id: uuid("id").defaultRandom().primaryKey(),
  diaryId: uuid("diary_id").references(() => diary.id, { onDelete: "cascade" }).notNull(),
  role: text("role").notNull(), // 'user' | 'assistant'
  content: text("content").notNull(),
  emotion: text("emotion"), // normal | happy | funny | surprise | heart | confused | angry | tear
  risk: integer("risk"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const diaryMessageRelations = relations(diaryMessage, ({ one }) => ({
  diary: one(diary, { fields: [diaryMessage.diaryId], references: [diary.id] }),
}));
