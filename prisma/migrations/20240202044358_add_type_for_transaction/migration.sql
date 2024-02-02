-- CreateEnum
CREATE TYPE "Type" AS ENUM ('EXPENSES', 'INCOME');

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'EXPENSES';

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'EXPENSES';
