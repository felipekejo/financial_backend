import { TransactionsRepository } from "@/repositories/transaction-repository";
import { Transaction } from "@prisma/client";

interface GetTransactionsCategoryUseCaseRequest {
  categoryId: string;
  accountId: string;
}
interface GetTransactionsCategoryUseCaseResponse {
  transactions: Transaction[];
}

export class GetTransactionsCategoryUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}
  async execute({
    categoryId,
    accountId,
  }: GetTransactionsCategoryUseCaseRequest): Promise<GetTransactionsCategoryUseCaseResponse> {
    const transactions = await this.transactionsRepository.findByCategoryId(
      categoryId,
      accountId,
    );
    return { transactions };
  }
}
