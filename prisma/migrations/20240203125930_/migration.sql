/*
  Warnings:

  - The values [INCOME] on the enum `Type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Type_new" AS ENUM ('EXPENSES', 'INCOMES');
ALTER TABLE "categories" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "transactions" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "transactions" ALTER COLUMN "type" TYPE "Type_new" USING ("type"::text::"Type_new");
ALTER TABLE "categories" ALTER COLUMN "type" TYPE "Type_new" USING ("type"::text::"Type_new");
ALTER TYPE "Type" RENAME TO "Type_old";
ALTER TYPE "Type_new" RENAME TO "Type";
DROP TYPE "Type_old";
ALTER TABLE "categories" ALTER COLUMN "type" SET DEFAULT 'EXPENSES';
ALTER TABLE "transactions" ALTER COLUMN "type" SET DEFAULT 'EXPENSES';
COMMIT;
