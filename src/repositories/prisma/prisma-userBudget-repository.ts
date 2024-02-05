import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UserBudgetsRepository } from "../userBudget-repository";

export class PrismaUserBudgetsRepository implements UserBudgetsRepository {
  async createUserConnectToBudget(
    name: string,
    email: string,
    password_hash: string,
    budgetId: string,
  ) {
    const userBudget = await prisma.userBudget.create({
      data: {
        User: {
          create: { name, email, password_hash },
        },
        Budget: {
          connect: { id: budgetId },
        },
      },
    });
    return userBudget;
  }

  async connectToUser(data: Prisma.UserBudgetUncheckedCreateInput) {
    const userBudget = await prisma.userBudget.create({
      data,
    });

    return userBudget;
  }
}
