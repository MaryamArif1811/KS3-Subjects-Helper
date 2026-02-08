export const user = pgTable("User", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),

  // No email
  // No password
  // No personal info at all

  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
