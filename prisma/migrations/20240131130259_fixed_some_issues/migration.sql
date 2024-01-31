/*
  Warnings:

  - Made the column `budget_id` on table `accounts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `budgets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category_id` on table `subcategories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `account_id` on table `transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_budget_id_fkey";

-- DropForeignKey
ALTER TABLE "budgets" DROP CONSTRAINT "budgets_user_id_fkey";

-- DropForeignKey
ALTER TABLE "subcategories" DROP CONSTRAINT "subcategories_category_id_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_account_id_fkey";

-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "budget_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "budgets" ALTER COLUMN "user_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "subcategories" ALTER COLUMN "category_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "account_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "budgets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subcategories" ADD CONSTRAINT "subcategories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
