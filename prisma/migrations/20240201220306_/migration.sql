/*
  Warnings:

  - You are about to drop the `UserBudget` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserBudget" DROP CONSTRAINT "UserBudget_budget_id_fkey";

-- DropForeignKey
ALTER TABLE "UserBudget" DROP CONSTRAINT "UserBudget_user_id_fkey";

-- DropTable
DROP TABLE "UserBudget";

-- CreateTable
CREATE TABLE "user_budgets" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "budget_id" TEXT NOT NULL,

    CONSTRAINT "user_budgets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_budgets" ADD CONSTRAINT "user_budgets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_budgets" ADD CONSTRAINT "user_budgets_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "budgets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
