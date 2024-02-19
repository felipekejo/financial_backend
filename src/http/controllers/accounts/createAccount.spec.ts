import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Account (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a new account", async () => {
    const budget = await prisma.budget.create({
      data: {
        name: "new budget",
      },
    });

    const response = await request(app.server).post("/accounts").send({
      name: "new account",
      budgetId: budget.id,
    });

    expect(response.statusCode).toEqual(201);
  });
});
