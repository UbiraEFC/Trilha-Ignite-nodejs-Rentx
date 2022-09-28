import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { getRepository, Repository } from "typeorm";
import { UsersTokens } from "../entities/UsersTokens";


class UsersTokensRepository implements IUsersTokensRepository {
	private repository: Repository<UsersTokens>;

	constructor() {
		this.repository = getRepository(UsersTokens);
	}
	
	async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UsersTokens> {
		const userToken = this.repository.create({
			expires_date,
			refresh_token,
			user_id,
		})

		await this.repository.save(userToken);

		return userToken;
	}

	async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersTokens> {
		const userToken = await this.repository.findOne({
			user_id,
			refresh_token,
		});
		return userToken;
	}

	async deleteById(id: string): Promise<void> {
		await this.repository.delete(id);
	}
}

export { UsersTokensRepository }