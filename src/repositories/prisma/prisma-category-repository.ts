import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { CategoriesRepository } from "../category-repository";

export class PrismaCategoryRepository implements CategoriesRepository {
  async create(data: Prisma.CategoryUncheckedCreateInput) {
    const category = await prisma.category.create({
      data,
    });

    return category;
  }

  async findById(id: string) {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    return category;
  }
}
