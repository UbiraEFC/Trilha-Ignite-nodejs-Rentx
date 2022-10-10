import { Response, Request, NextFunction, } from "express";
import { AppError } from "@shared/errors/AppError";
import { verify } from "jsonwebtoken";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "@config/auth";


interface IPayload {
	sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new AppError("Token missing", 401);
	}
	//Dica de como retirar algo de uma string
	//Formato recebido ==> bearer 6a54SD65a41sdc6514ac65a65s1c465a14c651a4sc
	// .split(" ") divide a string de acordo ops espaços 
	const [, token] = authHeader.split(" ");

	try {
		// O metodo verify em casa de erro retorna uma execção, que pode ser usada no Error()
		const { sub: user_id } = verify(
			token,
			auth.secret_token,
		) as IPayload;

		request.user = {
			id: user_id
		}

		next();
	} catch {
		throw new AppError("Invalid token!", 401);
	}
}