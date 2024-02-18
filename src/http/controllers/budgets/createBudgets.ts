import { PrismaBudgetsRepository } from "@/repositories/prisma/prisma-budgets-repository";
import { PrismaUserBudgetsRepository } from "@/repositories/prisma/prisma-userBudget-repository";
import { CreateBudgetUseCase } from "@/use-cases/create-budget";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createBudget(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createBudgetBodySchema = z.object({
    name: z.string(),
    userId: z.string(),
  });

  const { name, userId } = createBudgetBodySchema.parse(request.body);

  const prismaBudgetsRepository = new PrismaBudgetsRepository();
  const prismaUsersBudgetRepository = new PrismaUserBudgetsRepository();
  const budgetsUseCase = new CreateBudgetUseCase(
    prismaBudgetsRepository,
    prismaUsersBudgetRepository,
  );

  const budget = await budgetsUseCase.execute({
    name,
    userId,
  });

  return reply.status(201).send(budget);
}
