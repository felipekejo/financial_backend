import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { SubcategoriesRepository } from "../subcategory-repository";

export class PrismaSubcategoriesRepository implements SubcategoriesRepository {
  async findById(id: string) {
    const subcategory = await prisma.subcategory.findUnique({
      where: {
        id,
      },
    });

    if (!subcategory) {
      return null;
    }

    return subcategory;
  }

  async create(data: Prisma.SubcategoryUncheckedCreateInput) {
    const subcategory = await prisma.subcategory.create({
      data,
    });

    return subcategory;
  }
}
