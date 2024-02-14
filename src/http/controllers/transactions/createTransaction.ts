import { PrismaTransactionsRepository } from "@/repositories/prisma/prisma-transactions-repository";
import { CreateTransactionsUseCase } from "@/use-cases/create-transaction";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createTransactionBodySchema = z.object({
    description: z.string(),
    amount: z.number(),
    type: z.enum(["INCOMES", "EXPENSES"]),
    accountId: z.string(),
    categoryId: z.string(),
    subcategoryId: z.string(),
  });

  const { description, amount, type, accountId, categoryId, subcategoryId } =
    createTransactionBodySchema.parse(request.body);

  try {
    const prismaTransactionsRepository = new PrismaTransactionsRepository();
    const transactionsUseCase = new CreateTransactionsUseCase(
      prismaTransactionsRepository,
    );

    const transaction = await transactionsUseCase.execute({
      description,
      amount,
      type,
      accountId,
      categoryId,
      subcategoryId,
    });

    return reply.status(201).send(transaction);
  } catch (error) {
    return reply.status(400).send({ message: error });
  }
}
