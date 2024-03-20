import { TransactionsRepository } from "@/repositories/transaction-repository";

export class DeleteTransactionsUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute(transactionId: string): Promise<void> {
    await this.transactionsRepository.delete(transactionId);
  }
}
