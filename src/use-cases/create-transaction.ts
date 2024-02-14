import { TransactionsRepository } from "@/repositories/transaction-repository";
import { Transaction } from "@prisma/client";

interface CreateTransactionsUseCaseRequest {
  description: string;
  amount: number;
  type: "INCOMES" | "EXPENSES";
  accountId: string;
  categoryId: string;
  subcategoryId: string;
}

interface CreateTransactionsUseCaseResponse {
  transaction: Transaction;
}

export class CreateTransactionsUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute(
    data: CreateTransactionsUseCaseRequest,
  ): Promise<CreateTransactionsUseCaseResponse> {
    if (data.amount <= 0) {
      throw new Error("Amount must be greater than 0");
    }
    const transaction = await this.transactionsRepository.create({
      description: data.description,
      amount: data.amount,
      type: data.type,
      account_id: data.accountId,
      category_id: data.categoryId ?? null,
      subcategory_id: data.subcategoryId ?? null,
    });

    return { transaction };
  }
}
