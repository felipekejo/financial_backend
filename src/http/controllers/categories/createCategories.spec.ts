import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Categories (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a new category", async () => {
    const response = await request(app.server).post("/categories").send({
      name: "new category",
      type: "INCOMES",
    });
    expect(response.statusCode).toEqual(201);
  });
});
