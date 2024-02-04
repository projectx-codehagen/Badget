import { relations, sql } from "drizzle-orm";
import { bigint, mysqlEnum, timestamp, varchar } from "drizzle-orm/mysql-core";

import { PrimaryCategory } from "../enum";
import { mySqlTable } from "./_table";
import { project } from "./project";

export const category = mySqlTable("category", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow(),

  primary: mysqlEnum("primary", [
    PrimaryCategory.INCOME,
    PrimaryCategory.TRANSFER_IN,
    PrimaryCategory.TRANSFER_OUT,
    PrimaryCategory.LOAN_PAYMENTS,
    PrimaryCategory.BANK_FEES,
    PrimaryCategory.ENTERTAINMENT,
    PrimaryCategory.FOOD_AND_DRINK,
    PrimaryCategory.GENERAL_MERCHANDISE,
    PrimaryCategory.HOME_IMPROVEMENT,
    PrimaryCategory.MEDICAL,
    PrimaryCategory.PERSONAL_CARE,
    PrimaryCategory.GENERAL_SERVICES,
    PrimaryCategory.GOVERNMENT_AND_NON_PROFIT,
    PrimaryCategory.TRANSPORTATION,
    PrimaryCategory.TRAVEL,
    PrimaryCategory.RENT_AND_UTILITIES,
  ]).notNull(),
  detailed: varchar("detailed", { length: 63 }).notNull(),
  description: varchar("description", { length: 255 }),
});

/**
 * 👇 This code block will tell Drizzle that project is related to:
 * - category <-> projectsCategories -> N-to-1
 */
export const categoryRelations = relations(category, ({ one }) => ({
  author: one(projectsCategories, {
    fields: [category.id],
    references: [projectsCategories.id],
  }),
}));

export const projectsCategories = mySqlTable("projects_categories", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow(),

  projectId: bigint("project_id", { mode: "number" }).notNull(),

  label: varchar("label", { length: 63 }).notNull(),
  description: varchar("description", { length: 255 }),
});

/**
 * 👇 This code block will tell Drizzle that project is related to:
 * - projectsCategories <-> project   -> 1-to-1
 * - projectsCategories <-> category  -> 1-to-N
 */
export const projectsCategoriesRelations = relations(
  projectsCategories,
  ({ one, many }) => ({
    project: one(project, {
      fields: [projectsCategories.projectId],
      references: [project.id],
    }),
    category: many(category),
  }),
);
