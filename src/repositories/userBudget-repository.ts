import { Prisma, UserBudget } from "@prisma/client";

export interface UserBudgetsRepository {
  connectToUser(
    data: Prisma.UserBudgetUncheckedCreateInput,
  ): Promise<UserBudget>;
}
