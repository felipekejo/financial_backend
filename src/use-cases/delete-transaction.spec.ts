import { InMemoryTransactionsRepository } from "@/repositories/In-memory/in-memory-transactions-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteTransactionsUseCase } from "./delete-transaction";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let inMemoryTransactionsRepository: InMemoryTransactionsRepository;
let sut: DeleteTransactionsUseCase;

describe("Delete Transaction Use Case", async () => {
  beforeEach(() => {
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository();
    sut = new DeleteTransactionsUseCase(inMemoryTransactionsRepository);
  });
  it("should be able to delete a transaction", async () => {
    const transaction = await inMemoryTransactionsRepository.create({
      description: "new expense",
      amount: 100,
      type: "EXPENSES",
      account_id: "account-01",
      category_id: "category-01",
      subcategory_id: "subcategory-01",
    });
    await sut.execute(transaction.id);
    expect(inMemoryTransactionsRepository.items).toHaveLength(0);
  });
  it("should not be able to delete a non-existing transaction", async () => {
    expect(
      async () => await sut.execute("non-existent-id"),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
