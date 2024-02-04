import { Prisma } from "@prisma/client";
import { TransactionsRepository } from "../transaction-repository";
import { prisma } from "@/lib/prisma";

export class PrismaTransactionsRepository implements TransactionsRepository {
  async create(data: Prisma.TransactionUncheckedCreateInput) {
    const transaction = await prisma.transaction.create({
      data,
    });

    return transaction;
  }

  async findById(id: string) {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
    });

    return transaction;
  }

  async findByAccountId(accountId: string) {
    const transactions = await prisma.transaction.findMany({
      where: {
        account_id: accountId,
      },
    });

    return transactions;
  }

  async findByCategoryId(categoryId: string, accountId: string) {
    const transactions = await prisma.transaction.findMany({
      where: {
        account_id: accountId,
        category_id: categoryId,
      },
    });

    return transactions;
  }

  async findByType(type: "EXPENSES" | "INCOMES", accountId: string) {
    const transactions = await prisma.transaction.findMany({
      where: {
        account_id: accountId,
        type,
      },
    });

    return transactions;
  }

  async findByYear(year: string, accountId: string) {
    const transactions = await prisma.transaction.findMany({
      where: {
        account_id: accountId,
        created_at: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });
    return transactions;
  }

  async findByYearAndMonth(year: string, month: string, accountId: string) {
    const nextMonth =
      month === "12" ? "01" : ("0" + (parseInt(month, 10) + 1)).slice(-2);
    const nextYear =
      month === "12" ? (parseInt(year, 10) + 1).toString() : year;
    const transactions = await prisma.transaction.findMany({
      where: {
        account_id: accountId,
        created_at: {
          gte: new Date(`${year}-${month}-01`),
          lt: new Date(`${nextYear}-${nextMonth}-01`),
        },
      },
    });
    return transactions;
  }

  async findByDate(date: Date, accountId: string) {
    const transactions = await prisma.transaction.findMany({
      where: {
        account_id: accountId,
        created_at: {
          gte: new Date(date),
          lte: new Date(date),
        },
      },
    });
    return transactions;
  }

  async sumAmountByType(type: "EXPENSES" | "INCOMES", accountId: string) {
    const sumAmount = prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        account_id: accountId,
        type,
      },
    });
    return (await sumAmount)._sum.amount || 0;
  }

  async sumAmountByYear(
    year: string,
    accountId: string,
    type: "EXPENSES" | "INCOMES",
  ) {
    const sumAmount = prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        account_id: accountId,
        created_at: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
        type,
      },
    });
    return (await sumAmount)._sum.amount || 0;
  }
}
