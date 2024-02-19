import { PrismaCategoryRepository } from "@/repositories/prisma/prisma-category-repository";
import { CreateCategoryUseCase } from "@/use-cases/create-category";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createCategory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCategoryBodySchema = z.object({
    name: z.string(),
    type: z.enum(["INCOMES", "EXPENSES"]),
  });
  const { name, type } = createCategoryBodySchema.parse(request.body);

  const prismaCategoriesRepository = new PrismaCategoryRepository();
  const createCategoryUseCase = new CreateCategoryUseCase(
    prismaCategoriesRepository,
  );

  const category = await createCategoryUseCase.execute({
    name,
    type,
  });

  reply.status(201).send(category);
}
