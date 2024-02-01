import { Prisma, Budget, UserBudget } from "@prisma/client";

import { randomUUID } from "node:crypto";
import { UserBudgetsRepository } from "../userBudget-repository";

export class InMemoryUserBudgetRepository implements UserBudgetsRepository {
  public items: UserBudget[] = [];

  async connectToUser(data: Prisma.UserBudgetUncheckedCreateInput) {
    const userBudget = {
      id: data.id ?? randomUUID(),
      user_id: data.user_id,
      budget_id: data.budget_id,
    };

    this.items.push(userBudget);

    return userBudget;
  }
}
