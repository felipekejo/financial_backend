import { InMemoryCategoriesRepository } from "@/repositories/In-memory/in-memory-category-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateCategoryUseCase } from "./create-category";

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let sut: CreateCategoryUseCase;

describe("Create Category Use Case", () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    sut = new CreateCategoryUseCase(inMemoryCategoriesRepository);
  });
  it("should be able to create a new category", async () => {
    const { category } = await sut.execute({
      name: "New Category",
      type: "EXPENSES",
    });

    expect(category.id).toEqual(expect.any(String));
  });
});
