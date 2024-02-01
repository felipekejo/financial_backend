import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { AccountsRepository } from "../account-repository";

export class PrismaAccountsRepository implements AccountsRepository {
  async create(data: Prisma.AccountCreateManyInput) {
    const account = await prisma.account.create({
      data,
    });

    return account;
  }
}
