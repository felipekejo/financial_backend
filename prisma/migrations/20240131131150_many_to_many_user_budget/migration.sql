/*
  Warnings:

  - You are about to drop the column `user_id` on the `budgets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "budgets" DROP CONSTRAINT "budgets_user_id_fkey";

-- AlterTable
ALTER TABLE "budgets" DROP COLUMN "user_id";

-- CreateTable
CREATE TABLE "UserBudget" (
    "user_id" TEXT NOT NULL,
    "budget_id" TEXT NOT NULL,

    CONSTRAINT "UserBudget_pkey" PRIMARY KEY ("user_id","budget_id")
);

-- AddForeignKey
ALTER TABLE "UserBudget" ADD CONSTRAINT "UserBudget_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBudget" ADD CONSTRAINT "UserBudget_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "budgets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
