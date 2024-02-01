import { Account, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { AccountsRepository } from "../account-repository";

export class InMemoryAccountsRepository implements AccountsRepository {
  public items: Account[] = [];
  async create(data: Prisma.AccountCreateManyInput) {
    const account = {
      id: data.id ?? randomUUID(),
      name: data.name,
      budget_id: data.budget_id,
    };
    this.items.push(account);
    return account;
  }
}
