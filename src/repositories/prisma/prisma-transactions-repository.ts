import { prisma } from "@/lib/prisma";
import { Prisma, Transaction } from "@prisma/client";
import { TransactionsRepository } from "../transaction-repository";

export class PrismaTransactionsRepository implements TransactionsRepository {
  async create(data: Prisma.TransactionUncheckedCreateInput) {
    const transaction = await prisma.transaction.create({
      data,
    });

    return transaction;
  }

  async delete(id: string) {
    await prisma.transaction.delete({
      where: {
        id,
      },
    });
  }

  async findById(id: string) {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
      include: {
        Category: {
          select: {
            name: true,
          },
        },
        Subcategory: {
          select: {
            name: true,
          },
        },
      },
    });

    return transaction;
  }

  async findByAccountId(accountId: string) {
    const transactions = await prisma.transaction.findMany({
      where: {
        account_id: accountId,
      },
      include: {
        Category: {
          select: {
            name: true,
          },
        },
        Subcategory: {
          select: {
            name: true,
          },
        },
      },
    });

    return transactions;
  }

  async findByBudgetId(budgetId: string) {
    const budget = await prisma.budget.findMany({
      where: {
        id: budgetId,
      },
      select: {
        accounts: {
          include: {
            transactions: {
              include: {
                Category: {
                  select: {
                    name: true,
                  },
                },
                Subcategory: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return budget[0].accounts[0].transactions as Transaction[];
  }

  async findByCategoryId(categoryId: string, accountId: string) {
    const transactions = await prisma.transaction.findMany({
      where: {
        account_id: accountId,
        category_id: categoryId,
      },
      include: {
        Category: {
          select: {
            name: true,
          },
        },
        Subcategory: {
          select: {
            name: true,
          },
        },
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
      include: {
        Category: {
          select: {
            name: true,
          },
        },
        Subcategory: {
          select: {
            name: true,
          },
        },
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
      include: {
        Category: {
          select: {
            name: true,
          },
        },
        Subcategory: {
          select: {
            name: true,
          },
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
      include: {
        Category: {
          select: {
            name: true,
          },
        },
        Subcategory: {
          select: {
            name: true,
          },
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
      include: {
        Category: {
          select: {
            name: true,
          },
        },
        Subcategory: {
          select: {
            name: true,
          },
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

  async save(data: Transaction) {
    const transaction = await prisma.transaction.update({
      where: {
        id: data.id,
      },
      data,
    });

    return transaction;
  }
}
