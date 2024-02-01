import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { BudgetsRepository } from "../budget-repository";

export class PrismaBudgetsRepository implements BudgetsRepository {
  async create(data: Prisma.BudgetCreateInput) {
    const budget = await prisma.budget.create({
      data,
    });
    return budget;
  }

  async findById(id: string) {
    const budget = await prisma.budget.findUnique({
      where: {
        id,
      },
    });
    return budget;
  }
}
