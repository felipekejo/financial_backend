import { FastifyInstance } from "fastify";
import { create } from "./createTransaction";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/transactions", create);
}
