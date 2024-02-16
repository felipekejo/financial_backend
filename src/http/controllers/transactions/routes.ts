import { FastifyInstance } from "fastify";
import { create } from "./createTransaction";

export async function transactionsRoutes(app: FastifyInstance) {
  app.post("/transactions", create);
}
