import { InMemoryUsersRepository } from "@/repositories/In-memory/in-memory-user-repository";
import { compare } from "bcryptjs";
import { it } from "node:test";
import { beforeEach, describe, expect } from "vitest";
import { UserAlreadyExistsError } from "./errors/user-already-exists.error";
import { RegisterUseCase } from "./register";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;
describe("Register Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(inMemoryUsersRepository);
  });

  it("should be able to register a new user", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "john@test.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "john@test.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.hash_password,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email", async () => {
    const email = "john@test.com";

    await sut.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    expect(async () => {
      sut.execute({
        name: "John Doe",
        email,
        password: "123456",
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
