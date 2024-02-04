import { Prisma, Transaction } from "@prisma/client";
import { TransactionsRepository } from "../transaction-repository";
import { randomUUID } from "crypto";

export class InMemoryTransactionsRepository implements TransactionsRepository {
  public items: Transaction[] = [];
  async create(data: Prisma.TransactionUncheckedCreateInput) {
    const transaction = {
      id: data.id ?? randomUUID(),
      description: data.description,
      amount: data.amount,
      type: data.type,
      category_id: data.category_id,
      subcategory_id: data.subcategory_id,
      account_id: data.account_id,
      created_at: data.created_at ?? new Date(),
    };
    this.items.push(transaction);

    return transaction;
  }

  async findById(id: string) {
    const transaction = this.items.find((item) => item.id === id);

    if (!transaction) {
      return null;
    }

    return transaction;
  }

  async findByAccountId(accountId: string) {
    const transactions = this.items.filter(
      (item) => item.account_id === accountId,
    );

    if (!transactions) {
      return null;
    }
    return transactions;
  }

  async findByCategoryId(categoryId: string, accountId: string) {}

  async findByType(type: "INCOMES" | "EXPENSES", accountId: string) {}

  async findByYear(year: string, accountId: string) {}

  async findByYearAndMonth(year: string, month: string, accountId: string) {}

  async findByDate(date: Date, accountId: string) {}

  async sumAmountByType(type: "INCOMES" | "EXPENSES", accountId: string) {}

  async sumAmountByYear(
    year: string,
    accountId: string,
    type: "INCOMES" | "EXPENSES",
  ) {}
}
