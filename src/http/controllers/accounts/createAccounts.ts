import { PrismaAccountsRepository } from "@/repositories/prisma/prisma-accounts-repository";
import { CreateAccountUseCase } from "@/use-cases/create-account";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createAccount(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createAccountBodySchema = z.object({
    name: z.string(),
    budgetId: z.string(),
  });

  const { name, budgetId } = createAccountBodySchema.parse(request.body);

  const prismaAccountsRepository = new PrismaAccountsRepository();
  const accountsUseCase = new CreateAccountUseCase(prismaAccountsRepository);

  const account = await accountsUseCase.execute({
    name,
    budgetId,
  });

  return reply.status(201).send(account);
}
