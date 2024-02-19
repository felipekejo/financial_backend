import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Budget (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a new budget", async () => {
    const user = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "johndoe1@example.com",
        password_hash: "123456",
      },
    });
    const response = await request(app.server).post("/budgets").send({
      name: "new budget",
      userId: user.id,
    });

    expect(response.statusCode).toEqual(201);
  });
});
