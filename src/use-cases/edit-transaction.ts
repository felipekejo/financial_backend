import { TransactionsRepository } from "@/repositories/transaction-repository";
import { Transaction } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface EditTransactionsUseCaseRequest {
  transactionId: string;
  description: string;
  amount: number;
  type: "INCOMES" | "EXPENSES";
  accountId: string;
  categoryId: string;
  subcategoryId: string;
}

interface EditTransactionsUseCaseResponse {
  transaction: Transaction;
}

export class EditTransactionsUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    transactionId,
    description,
    amount,
    type,
    accountId,
    categoryId,
    subcategoryId,
  }: EditTransactionsUseCaseRequest): Promise<EditTransactionsUseCaseResponse> {
    const transaction =
      await this.transactionsRepository.findById(transactionId);
    if (!transaction) {
      throw new ResourceNotFoundError();
    }
  }
}
