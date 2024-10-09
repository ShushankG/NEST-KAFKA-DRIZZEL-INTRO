import { int, mysqlTable, serial, varchar, text } from 'drizzle-orm/mysql-core';
export const usersTable = mysqlTable('users_table', {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  age: int().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});
export const cars = mysqlTable('cars', {
  id: serial('id').primaryKey(),
  name: text('name'),
  color:text('color')
});
