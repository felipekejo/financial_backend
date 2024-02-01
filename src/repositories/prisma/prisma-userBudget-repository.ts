import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class PrismaUserBudgetsRepository {
  async connectToUser(data: Prisma.UserBudgetCreateInput) {
    await prisma.userBudget.create({
      data,
    });
  }
}
