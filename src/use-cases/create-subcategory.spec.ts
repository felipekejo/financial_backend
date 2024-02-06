import { InMemorySubcategoriesRepository } from "@/repositories/In-memory/in-memory-subcategories-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateSubcategoriesUseCase } from "./create-subcategory";

let inMemorySubcategoriesRepository: InMemorySubcategoriesRepository;
let sut: CreateSubcategoriesUseCase;

describe("Create Subcategory Use Case", () => {
  beforeEach(() => {
    inMemorySubcategoriesRepository = new InMemorySubcategoriesRepository();
    sut = new CreateSubcategoriesUseCase(inMemorySubcategoriesRepository);
  });

  it("should be able to create a new subcategory", async () => {
    const { subcategory } = await sut.execute({
      name: "new subcategory",
      categoryId: "category-01",
    });
    expect(subcategory.id).toEqual(expect.any(String));
  });
});
