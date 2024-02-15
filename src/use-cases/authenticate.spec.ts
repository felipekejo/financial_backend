import { InMemoryUsersRepository } from "@/repositories/In-memory/in-memory-users-repository";

import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { hash } from "bcryptjs";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(inMemoryUsersRepository);
  });

  it("should be able to authenticate", async () => {
    await inMemoryUsersRepository.create({
      name: "John Doe",
      email: "john@test.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "john@test.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await inMemoryUsersRepository.create({
      name: "John Doe",
      email: "john@test.com",
      password_hash: await hash("123456", 6),
    });
    expect(async () => {
      await sut.execute({
        email: "wrong-email@test.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await inMemoryUsersRepository.create({
      name: "John Doe",
      email: "john@test.com",
      password_hash: await hash("123456", 6),
    });
    expect(async () => {
      await sut.execute({
        email: "john@test.com",
        password: "wrong-password",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
