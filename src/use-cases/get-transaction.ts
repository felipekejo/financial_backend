import { TransactionsRepository } from "@/repositories/transaction-repository";
import { Transaction } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetTransactionsUseCaseResponse {
  id: string;
}

export class GetTransactionsUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({ id }: GetTransactionsUseCaseResponse): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findById(id);

    if (!transaction) {
      throw new ResourceNotFoundError();
    }

    return transaction;
  }
}
