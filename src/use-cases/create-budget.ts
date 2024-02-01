import { BudgetsRepository } from "@/repositories/budget-repository";
import { UserBudgetsRepository } from "@/repositories/userBudget-repository";

import { Budget } from "@prisma/client";

interface CreateBudgetUseCaseRequest {
  name: string;
  userId: string;
}

interface CreateBudgetUseCaseResponse {
  budget: Budget;
}

export class CreateBudgetUseCase {
  constructor(
    private budgetsRepository: BudgetsRepository,
    private userBudgetsRepository: UserBudgetsRepository,
  ) {}

  async execute({
    name,
    userId,
  }: CreateBudgetUseCaseRequest): Promise<CreateBudgetUseCaseResponse> {
    const budget = await this.budgetsRepository.create({ name });
    await this.userBudgetsRepository.connectToUser({
      budget_id: budget.id,
      user_id: userId,
    });
    return { budget };
  }
}
