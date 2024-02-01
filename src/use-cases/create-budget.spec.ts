import { InMemoryBudgetsRepository } from "@/repositories/In-memory/in-memory-budgets-repository";
import { CreateBudgetUseCase } from "./create-budget";
import { InMemoryUserBudgetRepository } from "@/repositories/In-memory/in-memory-userBudget-repository";
import { beforeEach, describe, expect, it } from "vitest";

let inMemoryBudgetsRepository: InMemoryBudgetsRepository;
let inMemoryUserBudgetRepository: InMemoryUserBudgetRepository;
let sut: CreateBudgetUseCase;

describe("Create Budget Use Case", () => {
  beforeEach(() => {
    inMemoryBudgetsRepository = new InMemoryBudgetsRepository();
    inMemoryUserBudgetRepository = new InMemoryUserBudgetRepository();
    sut = new CreateBudgetUseCase(
      inMemoryBudgetsRepository,
      inMemoryUserBudgetRepository,
    );
  });

  it("should be able to create a new budget", async () => {
    const { budget } = await sut.execute({
      name: "New Budget",
      user_id: "user-1",
    });

    expect(budget.id).toEqual(expect.any(String));
  });
});
