import { TransactionsRepository } from "@/repositories/transaction-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

export class DeleteTransactionsUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute(transactionId: string): Promise<void> {
    const transaction =
      await this.transactionsRepository.findById(transactionId);
    if (!transaction) {
      throw new ResourceNotFoundError();
    }
    await this.transactionsRepository.delete(transactionId);
  }
}
