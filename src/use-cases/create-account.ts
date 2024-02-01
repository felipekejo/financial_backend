import { AccountsRepository } from "@/repositories/account-repository";
import { Account } from "@prisma/client";

interface CreateAccountUseCaseRequest {
  name: string;
  budgetId: string;
}

interface CreateAccountUseCaseResponse {
  account: Account;
}
export class CreateAccountUseCase {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute(
    data: CreateAccountUseCaseRequest,
  ): Promise<CreateAccountUseCaseResponse> {
    const account = await this.accountsRepository.create({
      name: data.name,
      budget_id: data.budgetId,
    });

    return { account };
  }
}
