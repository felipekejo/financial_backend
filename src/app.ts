import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { accountsRoutes } from "./http/controllers/accounts/routes";
import { budgetsRoutes } from "./http/controllers/budgets/routes";
import { transactionsRoutes } from "./http/controllers/transactions/routes";
import { usersRoutes } from "./http/controllers/users/routes";

export const app = fastify();

app.register(usersRoutes);
app.register(transactionsRoutes);
app.register(accountsRoutes);
app.register(budgetsRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here we should log to an external tool like Datadog/NewRelic/ Sentry
  }

  return reply.status(500).send({ message: "Internal server error" });
});
