import { FastifyInstance } from "fastify";
import { createBudget } from "./createBudgets";

export async function budgetsRoutes(app: FastifyInstance) {
  app.post("/budgets", createBudget);
}
