import { InMemoryTransactionsRepository } from "@/repositories/In-memory/in-memory-transactions-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateTransactionsUseCase } from "./create-transaction";

let inMemoryTransactionsRepository: InMemoryTransactionsRepository;
let sut: CreateTransactionsUseCase;

describe("Create Transaction Use Case", () => {
  beforeEach(() => {
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository();
    sut = new CreateTransactionsUseCase(inMemoryTransactionsRepository);
  });
  it("should be able to create an Income transaction", async () => {
    const { transaction } = await sut.execute({
      description: "new income",
      amount: 100,
      type: "INCOMES",
      accountId: "account-01",
      categoryId: "category-01",
      subcategoryId: "subcategory-01",
    });

    expect(transaction.id).toEqual(expect.any(String));
  });
  it("should be able to create an Expense transaction", async () => {
    const { transaction } = await sut.execute({
      description: "new expense",
      amount: 100,
      type: "EXPENSES",
      accountId: "account-01",
      categoryId: "category-01",
      subcategoryId: "subcategory-01",
    });

    expect(transaction.id).toEqual(expect.any(String));
  });

  it("should not be able to create a transaction with a negative amount", async () => {
    await expect(
      sut.execute({
        description: "new expense",
        amount: -100,
        type: "EXPENSES",
        accountId: "account-01",
        categoryId: "category-01",
        subcategoryId: "subcategory-01",
      }),
    ).rejects.toThrow("Amount must be greater than 0");
  });

  it("should be able to create a transaction without a category", async () => {
    const { transaction } = await sut.execute({
      description: "new expense",
      amount: 100,
      type: "EXPENSES",
      accountId: "account-01",
      categoryId: "",
      subcategoryId: "subcategory-01",
    });

    expect(transaction.id).toEqual(expect.any(String));
  });
  it("should be able to create a transaction without a subcategory", async () => {
    const { transaction } = await sut.execute({
      description: "new expense",
      amount: 100,
      type: "EXPENSES",
      accountId: "account-01",
      categoryId: "category-01",
      subcategoryId: "",
    });

    expect(transaction.subcategory_id).toEqual(expect.any(String));
  });
  it("should be able to create a transaction without a category and subcategory", async () => {
    const { transaction } = await sut.execute({
      description: "new expense",
      amount: 100,
      type: "EXPENSES",
      accountId: "account-01",
      categoryId: "",
      subcategoryId: "",
    });

    expect(transaction.id).toEqual(expect.any(String));
  });
});
