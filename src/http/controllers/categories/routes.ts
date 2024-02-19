import { FastifyInstance } from "fastify";
import { createCategory } from "./createCategories";

export async function categoriesRoutes(app: FastifyInstance) {
  app.post("/categories", createCategory);
}
