import { BudgetsRepository } from "@/repositories/budget-repository";
import { UserBudgetsRepository } from "@/repositories/userBudget-repository";
import { Budget } from "@prisma/client";

interface CreateBudgetUseCaseRequest {
  name: string;
  user_id: string;
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
    user_id,
  }: CreateBudgetUseCaseRequest): Promise<CreateBudgetUseCaseResponse> {
    const budget = await this.budgetsRepository.create({ name });

    await this.userBudgetsRepository.connectToUser({
      user_id,
      budget_id: budget.id,
    });

    return { budget };
  }
}
