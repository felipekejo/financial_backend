import { randomUUID } from "crypto";

import { Budget, Prisma } from "@prisma/client";
import { BudgetsRepository } from "../budget-repository";

export class InMemoryBudgetsRepository implements BudgetsRepository {
  public items: Budget[] = [];
  async create(data: Prisma.BudgetCreateManyInput) {
    const budget = {
      id: data.id ?? randomUUID(),
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
