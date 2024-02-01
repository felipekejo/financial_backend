import { Prisma } from "@prisma/client";
import { BudgetsRepository } from "../budget-repository";
import { prisma } from "@/lib/prisma";

export class PrismaBudgetsRepository implements BudgetsRepository {
  async findById(id: string) {
    const budget = await prisma.budget.findUnique({
      where: {
        id,
      },
    });

    return budget;
  }

  async connectToUser(data: Prisma.UserBudgetCreateInput) {
    await prisma.userBudget.create({
      data,
    });
  }

  async create(data: Prisma.BudgetCreateInput) {
    const budget = await prisma.budget.create({
      data,
    });

    return budget;
  }
}
