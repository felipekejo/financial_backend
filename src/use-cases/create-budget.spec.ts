import { InMemoryBudgetsRepository } from "@/repositories/In-memory/in-memory-budgets-repository";
import { CreateBudgetUseCase } from "./create-budget";

import { InMemoryUserBudgetRepository } from "@/repositories/In-memory/in-memory-userBudget-repository";
import { beforeEach, describe, expect, it } from "vitest";

let inMemoryBudgetsRepository: InMemoryBudgetsRepository;
let inMemoryUserBudgetsRepository: InMemoryUserBudgetRepository;
let sut: CreateBudgetUseCase;

describe("Create Budget Use Case", () => {
  beforeEach(() => {
    inMemoryBudgetsRepository = new InMemoryBudgetsRepository();
    inMemoryUserBudgetsRepository = new InMemoryUserBudgetRepository();
    sut = new CreateBudgetUseCase(
      inMemoryBudgetsRepository,
      inMemoryUserBudgetsRepository,
    );
  });

  it("should be able to create a new budget", async () => {
    const { budget } = await sut.execute({
      name: "New Budget",
      userId: "user-01",
    });

    expect(budget.id).toEqual(expect.any(String));
  });
});
