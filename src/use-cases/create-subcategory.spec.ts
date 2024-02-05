import { InMemorySubcategoriesRepository } from "@/repositories/In-memory/in-memory-subcategories-repository";
import { beforeEach, describe } from "vitest";
import { CreateSubcategoriesUseCase } from "./create-subcategory";

let inMemorySubcategoriesRepository: InMemorySubcategoriesRepository;
let sut: CreateSubcategoriesUseCase;

describe("Should be to create a subcategory", () => {
  beforeEach(() => {
    inMemorySubcategoriesRepository = new InMemorySubcategoriesRepository();
    sut = new CreateSubcategoriesUseCase(inMemorySubcategoriesRepository);
  });
});
