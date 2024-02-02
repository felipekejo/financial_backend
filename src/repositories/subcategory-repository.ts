import { Prisma, Subcategory } from "@prisma/client";

export interface SubcategoriesRepository {
  create(data: Prisma.SubcategoryUncheckedCreateInput): Promise<Subcategory>;
}
