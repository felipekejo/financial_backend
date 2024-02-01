import { InMemoryAccountsRepository } from "@/repositories/In-memory/in-memory-accounts-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateAccountUseCase } from "./create-account";

let inMemoryAccountsRepository: InMemoryAccountsRepository;
let sut: CreateAccountUseCase;

describe("Create Account Use Case", () => {
  beforeEach(() => {
    inMemoryAccountsRepository = new InMemoryAccountsRepository();
    sut = new CreateAccountUseCase(inMemoryAccountsRepository);
  });

  it("should be able to create a new account", async () => {
    const { account } = await sut.execute({
      name: "New Account",
      budgetId: "budget-01",
    });

    expect(account.id).toEqual(expect.any(String));
  });
});
