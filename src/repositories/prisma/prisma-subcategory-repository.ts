import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { SubcategoriesRepository } from "../subcategory-repository";

export class PrismaSubcategoriesRepository implements SubcategoriesRepository {
  async create(data: Prisma.SubcategoryUncheckedCreateInput) {
    const subcategory = await prisma.subcategory.create({
      data,
    });

    return subcategory;
  }
}
