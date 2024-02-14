import { app } from "@/app";
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
    const response = await request(app.server).post("/transactions").send({
      description: "New Transaction",
      amount: 5000,
      type: "INCOMES",
      accountId: "account-01",
      categoryId: "category-01",
      subcategoryId: "subcategory-01",
    });
    expect(response.statusCode).toBe(201);
  });
});
