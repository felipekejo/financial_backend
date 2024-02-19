import { PrismaSubcategoriesRepository } from "@/repositories/prisma/prisma-subcategory-repository";
import { CreateSubcategoriesUseCase } from "@/use-cases/create-subcategory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createSubcategory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createSubcategoryBodySchema = z.object({
    name: z.string(),
    categoryId: z.string(),
  });

  const { name, categoryId } = createSubcategoryBodySchema.parse(request.body);

  const prismaSubcategoriesRepository = new PrismaSubcategoriesRepository();
  const createSubcategoriesUseCase = new CreateSubcategoriesUseCase(
    prismaSubcategoriesRepository,
  );

  const subcategories = await createSubcategoriesUseCase.execute({
    name,
    categoryId,
  });

  reply.status(201).send(subcategories);
}
