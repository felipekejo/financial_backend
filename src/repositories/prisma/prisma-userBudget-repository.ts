import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UserBudgetsRepository } from "../userBudget-repository";

export class PrismaUserBudgetsRepository implements UserBudgetsRepository {
  async connectToUser(data: Prisma.UserBudgetUncheckedCreateInput) {
    const userBudget = await prisma.userBudget.create({
      data,
    });

    return userBudget;
  }
}
