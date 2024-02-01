import { Prisma, Budget, UserBudget } from "@prisma/client";

import { randomUUID } from "node:crypto";
import { BudgetsRepository } from "../budget-repository";

export class InMemoryBudgetsRepository implements BudgetsRepository {
  public items: Budget[] = [];
  public connections: UserBudget[] = [];

  async create(data: Prisma.BudgetCreateInput) {
    const budget = {
      id: randomUUID(),
      name: data.name,
    };

    this.items.push(budget);

    return budget;
  }

  async findById(id: string) {
    const budget = this.items.find((item) => item.id === id);
    if (!budget) {
      return null;
    }

    return budget;
  }
}
