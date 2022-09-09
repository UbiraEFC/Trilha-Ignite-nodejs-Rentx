import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";


interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: {
		name: string;
		email: string;
	};
	token: string;
}

@injectable()
class AuthenticateUserUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}

	async execute({ email, password }: IRequest): Promise<IResponse> {
		// Usuário existe?
		const user = await this.usersRepository.findByEmail(email);
		if (!user) {
			throw new AppError("Email or password incorrect!");
		}
		
		// Senha correta?
		const passwordMatch = await compare(password, user.password);
		if (!passwordMatch) {
			throw new AppError("Email or password incorrect!");
		}

		// Gerar token // palavra-chave "oibira" --> 85afa1381ea21e06861b96ccfc4c8df3 by:MD5 HasH Generator
		const token = sign({}, "85afa1381ea21e06861b96ccfc4c8df3", {
			subject: user.id,
			expiresIn: "1d"
		});

		const tokenReturn: IResponse = {
			token,
			user: {
				name: user.name,
				email: user.email
			}
		}

		return tokenReturn
	}
}

export { AuthenticateUserUseCase }