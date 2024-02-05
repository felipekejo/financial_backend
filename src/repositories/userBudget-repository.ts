import { Prisma, UserBudget } from "@prisma/client";

export interface UserBudgetsRepository {
  connectToUser(
    data: Prisma.UserBudgetUncheckedCreateInput,
  ): Promise<UserBudget>;
  createUserConnectToBudget(
    name: string,
    email: string,
    password_hash: string,
    budgetId: string,
  ): Promise<UserBudget>;
}
