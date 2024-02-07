import { InMemoryTransactionsRepository } from "@/repositories/In-memory/in-memory-transactions-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetTransactionsCategoryUseCase } from "./get-transactios-category";

let inMemoryTransactionRepository: InMemoryTransactionsRepository;
let sut: GetTransactionsCategoryUseCase;
describe("Get all transactions by category", () => {
  beforeEach(() => {
    inMemoryTransactionRepository = new InMemoryTransactionsRepository();
    sut = new GetTransactionsCategoryUseCase(inMemoryTransactionRepository);
  });

  it("should be able to get all transactions by category", async () => {
    await inMemoryTransactionRepository.create({
      account_id: "1",
      amount: 100,
      category_id: "1",
      created_at: new Date(),
      description: "any_description",
      type: "EXPENSES",
    });
    await inMemoryTransactionRepository.create({
      account_id: "1",
      amount: 1100,
      category_id: "1",
      created_at: new Date(),
      description: "any_description",
      type: "INCOMES",
    });

    const { transactions } = await sut.execute({
      accountId: "1",
      categoryId: "1",
    });

    expect(transactions).toHaveLength(2);
  });

  it("should not get transactions with a different account", async () => {
    await inMemoryTransactionRepository.create({
      account_id: "2",
      amount: 100,
      category_id: "1",
      created_at: new Date(),
      description: "any_description",
      type: "EXPENSES",
    });
    await inMemoryTransactionRepository.create({
      account_id: "2",
      amount: 1100,
      category_id: "1",
      created_at: new Date(),
      description: "any_description",
      type: "INCOMES",
    });
    await inMemoryTransactionRepository.create({
      account_id: "2",
      amount: 1100,
      category_id: "1",
      created_at: new Date(),
      description: "any_description",
      type: "INCOMES",
    });

    const { transactions } = await sut.execute({
      accountId: "1",
      categoryId: "1",
    });

    expect(transactions).toHaveLength(0);
  });

  it("should not get transactions with a different category", async () => {
    await inMemoryTransactionRepository.create({
      account_id: "2",
      amount: 100,
      category_id: "2",
      created_at: new Date(),
      description: "any_description",
      type: "EXPENSES",
    });
    await inMemoryTransactionRepository.create({
      account_id: "1",
      amount: 1100,
      category_id: "2",
      created_at: new Date(),
      description: "any_description",
      type: "INCOMES",
    });
    await inMemoryTransactionRepository.create({
      account_id: "1",
      amount: 1100,
      category_id: "2",
      created_at: new Date(),
      description: "any_description",
      type: "INCOMES",
    });

    const { transactions } = await sut.execute({
      accountId: "1",
      categoryId: "1",
    });

    expect(transactions).toHaveLength(0);
  });
});
