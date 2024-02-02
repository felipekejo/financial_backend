import { Category, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { CategoriesRepository } from "../category-repository";

export class InMemoryCategoriesRepository implements CategoriesRepository {
  public items: Category[] = [];
  async create(data: Prisma.CategoryUncheckedCreateInput) {
    const category = {
      id: data.id ?? randomUUID(),
      name: data.name,
      type: data.type ?? "EXPENSES",
    };
    this.items.push(category);
    return category;
  }

  async findById(id: string) {
    const category = this.items.find((item) => item.id === id);
    if (!category) {
      return null;
    }
    return category;
  }
}
