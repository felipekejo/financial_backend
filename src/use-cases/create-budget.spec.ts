import { InMemoryBudgetsRepository } from "@/repositories/In-memory/in-memory-budgets-repository";
import { CreateBudgetUseCase } from "./create-budget";

import { beforeEach, describe, expect, it } from "vitest";

let inMemoryBudgetsRepository: InMemoryBudgetsRepository;

let sut: CreateBudgetUseCase;

describe("Create Budget Use Case", () => {
  beforeEach(() => {
    inMemoryBudgetsRepository = new InMemoryBudgetsRepository();

    sut = new CreateBudgetUseCase(inMemoryBudgetsRepository);
  });

  it("should be able to create a new budget", async () => {
    const { budget } = await sut.execute({
      name: "New Budget",
    });

    expect(budget.id).toEqual(expect.any(String));
  });
});
