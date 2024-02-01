import { BudgetsRepository } from "@/repositories/budget-repository";

import { Budget } from "@prisma/client";

interface CreateBudgetUseCaseRequest {
  name: string;
}

interface CreateBudgetUseCaseResponse {
  budget: Budget;
}

export class CreateBudgetUseCase {
  constructor(private budgetsRepository: BudgetsRepository) {}

  async execute({
    name,
  }: CreateBudgetUseCaseRequest): Promise<CreateBudgetUseCaseResponse> {
    const budget = await this.budgetsRepository.create({ name });

    return { budget };
  }
}
