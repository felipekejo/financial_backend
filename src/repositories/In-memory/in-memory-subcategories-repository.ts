import { Prisma, Subcategory } from "@prisma/client";
import { SubcategoriesRepository } from "../subcategory-repository";
import { randomUUID } from "crypto";

export class InMemorySubcategoriesRepository
  implements SubcategoriesRepository
{
  public items: Subcategory[] = [];

  async findById(id: string) {
    const subcategory = this.items.find((item) => {
      return item.id === id;
    });

    if (!subcategory) {
      return null;
    }

    return subcategory;
  }

  async create(data: Prisma.SubcategoryUncheckedCreateInput) {
    const subcategory = {
      id: data.id ?? randomUUID(),
      name: data.name,
      category_id: data.category_id,
    };

    return subcategory;
  }
}
