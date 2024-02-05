import { Prisma, UserBudget } from "@prisma/client";

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

  async createUserConnectToBudget(
    name: string,
    email: string,
    password_hash: string,
    budgetId: string,
  ) {
    const user = {
      id: randomUUID(),
      name,
      email,
      password_hash,
    };
    const userBudget = {
      id: randomUUID(),
      user_id: user.id,
      budget_id: budgetId,
    };

    this.items.push(userBudget);
    return userBudget;
  }
}
