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
      created_at: new Date("2022-01-01T00:00:00.000Z"),
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
      created_at: new Date("2022-01-01T00:00:00.000Z"),
    });

    expect(transaction.id).toEqual(expect.any(String));
  });
});
