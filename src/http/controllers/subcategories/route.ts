import { FastifyInstance } from "fastify";
import { createSubcategory } from "./createSubcategories";

export async function subcategoriesRoutes(app: FastifyInstance) {
  app.post("/subcategories", createSubcategory);
}
