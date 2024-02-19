import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Subcategories (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a new subcategory", async () => {
    const category = await prisma.category.create({
      data: {
        name: "new category",
      },
    });

    const response = await request(app.server).post("/subcategories").send({
      name: "new subcategory",
      categoryId: category.id,
    });
    expect(response.statusCode).toEqual(201);
  });
});
