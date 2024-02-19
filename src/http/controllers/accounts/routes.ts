import { FastifyInstance } from "fastify";
import { createAccount } from "./createAccounts";

export async function accountsRoutes(app: FastifyInstance) {
  app.post("/accounts", createAccount);
}
