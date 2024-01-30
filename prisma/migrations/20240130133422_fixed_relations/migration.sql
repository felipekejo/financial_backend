/*
  Warnings:

  - You are about to drop the column `transaction_id` on the `categories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_transaction_id_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "transaction_id";

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "category_id" TEXT;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
