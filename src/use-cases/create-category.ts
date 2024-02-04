import { CategoriesRepository } from "@/repositories/category-repository";
import { Category } from "@prisma/client";

interface CreateCategoryUseCaseRequest {
  name: string;
  type: "INCOMES" | "EXPENSES";
}

interface CreateCategoryUseCaseResponse {
  category: Category;
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(
    data: CreateCategoryUseCaseRequest,
  ): Promise<CreateCategoryUseCaseResponse> {
    const category = await this.categoriesRepository.create({
      name: data.name,
      type: data.type,
    });

    return { category };
  }
}
