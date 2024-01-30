/*
  Warnings:

  - You are about to drop the column `budget_id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_budget_id_fkey";

-- AlterTable
ALTER TABLE "budgets" ADD COLUMN     "user_id" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "budget_id";

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
