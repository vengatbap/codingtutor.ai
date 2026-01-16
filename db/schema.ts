import { config } from 'dotenv';
import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

config({ path: '.env' });


export const users = pgTable("users", {
  id: text("id").primaryKey(), // cuid / uuid
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const lessons = pgTable("lessons", {
  id: text("id").primaryKey(),
  courseId: text("course_id").notNull(),

  title: text("title").notNull(),
  description: text("description"),
  content: text("content").notNull(),

  starterPrompt: text("starter_prompt"), // 👈 THIS LINE

  language: text("language").notNull(),
  level: text("level").notNull(),
  sortOrder: integer("sort_order").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


export const courses = pgTable("courses", {
  id: text("id").primaryKey(), // cuid / slug
  title: text("title").notNull(),
  description: text("description"),
  language: text("language").notNull(),
  level: text("level").notNull(),

  sortOrder: integer("sort_order").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});