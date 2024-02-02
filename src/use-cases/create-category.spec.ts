import { InMemoryCategoriesRepository } from "@/repositories/In-memory/in-memoru-create-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateCategoryUseCase } from "./create-categor";

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
    });

    expect(category.id).toEqual(expect.any(String));
  });
});
