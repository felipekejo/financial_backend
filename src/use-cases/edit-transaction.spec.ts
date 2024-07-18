import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryTransactionsRepository } from "@/repositories/In-memory/in-memory-transactions-repository";
import { EditTransactionsUseCase } from "./edit-transaction";

let inMemoryTransactionsRepository: InMemoryTransactionsRepository;
let sut: EditTransactionsUseCase;

describe("Edit Transaction Use Case", () => {
  beforeEach(() => {
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository();
    sut = new EditTransactionsUseCase(inMemoryTransactionsRepository);
  });

  it("should be able to edit a transaction", async () => {
    const createdTransaction = await inMemoryTransactionsRepository.create({
      description: "new transaction",
      amount: 100,
      type: "INCOMES",
      account_id: "account-01",
      category_id: "category-01",
      subcategory_id: "subcategory-01",
      created_at: new Date("2022-01-01T00:00:00.000Z"),
    });

    const transaction = await sut.execute({
      transactionId: createdTransaction.id,
      description: "new description",
      amount: 200,
      type: "EXPENSES",
      accountId: "account-01",
      categoryId: "category-01",
      subcategoryId: "subcategory-01",
    });

    expect(transaction.transaction.description).toEqual("new description");
    expect(transaction.transaction.amount).toEqual(200);
    expect(transaction.transaction.type).toEqual("EXPENSES");
  });
});
