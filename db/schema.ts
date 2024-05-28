import { Description } from "@radix-ui/react-dialog";
import { relations } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, serial, text, timestamp,} from "drizzle-orm/pg-core";


export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageSrc: text("image_src").notNull(),
});

export const coursesRelation = relations(courses, ({ many }) => ({
  userProgress: many(userProgress),
  units: many(units)
}));

export const units = pgTable("units", {
  id: serial("id").primaryKey(),
  title:text("title").notNull(),
  description: text("description").notNull(),
  courseId: integer("course_id").references(() => courses.id, {onDelete: "cascade"}).notNull(),
  order: integer("order").notNull(),
});

const unitRelations = relations(units, ({many, one}) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id],
  }),
}));


export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  unitId: integer("unit_id").references(() => units.id, {onDelete:"cascade"}).notNull(),
  order: integer("order").notNull(),
});


export const userProgress = pgTable("user_progress", {
  userId: text("user_id").primaryKey(),
  userName: text("user_name").notNull().default("user"),
  userImageSrc: text("user_image_src").notNull().default("/mascot.svg"),
  activeCourseId: integer("active_course_id").references(() => courses.id, {onDelete: "cascade"}),
  hearts: integer("hearts").notNull().default(5),
  points: integer("points").notNull().default(5),

});


export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(courses, {
    fields: [userProgress.activeCourseId],
    references: [courses.id],
  }),
}));