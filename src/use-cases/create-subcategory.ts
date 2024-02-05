import { SubcategoriesRepository } from "@/repositories/subcategory-repository";
import { Subcategory } from "@prisma/client";

interface CreateSubcategoriesUseCaseRequest {
  name: string;
  categoryId: string;
}

interface CreateSubcategoriesUseCaseResponse {
  subcategory: Subcategory;
}

export class CreateSubcategoriesUseCase {
  constructor(private subcategoriesRepository: SubcategoriesRepository) {}

  async execute(
    data: CreateSubcategoriesUseCaseRequest,
  ): Promise<CreateSubcategoriesUseCaseResponse> {
    const subcategory = await this.subcategoriesRepository.create({
      name: data.name,
      category_id: data.categoryId,
    });

    return { subcategory };
  }
}
