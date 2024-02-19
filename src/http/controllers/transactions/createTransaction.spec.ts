import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Transaction (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a new transaction", async () => {
    const budget = await prisma.budget.create({
      data: {
        name: "new budget",
      },
    });
    const account = await prisma.account.create({
      data: {
        name: "new account",
        budget_id: budget.id,
      },
    });
    const category = await prisma.category.create({
      data: {
        name: "new category",
      },
    });
    const subcategory = await prisma.subcategory.create({
      data: {
        name: "new subcategory",
        category_id: category.id,
      },
    });

    const response = await request(app.server).post("/transactions").send({
      description: "new income",
      amount: 100,
      type: "INCOMES",
      accountId: account.id,
      categoryId: category.id,
      subcategoryId: subcategory.id,
    });
    expect(response.statusCode).toEqual(201);
  });
});
