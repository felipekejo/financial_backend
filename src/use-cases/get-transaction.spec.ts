import { beforeEach, describe, expect, it } from "vitest";
import { GetTransactionsUseCase } from "./get-transaction";
import { InMemoryTransactionsRepository } from "@/repositories/In-memory/in-memory-transactions-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let inMemoryTransactionsRepository: InMemoryTransactionsRepository;
let sut: GetTransactionsUseCase;

describe("Get Transaction Use Case", () => {
  beforeEach(() => {
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository();
    sut = new GetTransactionsUseCase(inMemoryTransactionsRepository);
  });

  it("should be able to get a transaction", async () => {
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
      id: createdTransaction.id,
    });

    expect(transaction.id).toEqual(expect.any(String));
    expect(transaction.description).toEqual("new transaction");
  });

  it("should not be able to get a non-existent transaction", async () => {
    expect(
      async () =>
        await sut.execute({
          id: "non-existent-id",
        }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
