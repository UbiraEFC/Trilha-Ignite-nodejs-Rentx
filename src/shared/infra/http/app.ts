import "reflect-metadata";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import swaggerFile from "../../../swagger.json";


import createConnection from "@shared/infra/typeorm";
import "@shared/container";
import { AppError } from "@shared/errors/AppError";
import upload from "@config/upload";

createConnection();
const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
	if (err instanceof AppError) {
		return response.status(err.statusCode).json({
			message: err.message
		});
	}

	return response.status(500).json({
		status: "error",
		message: `Internal server error -> ${err.message}`
	});
});

export { app }

// Padrão de Projeto Singleton

// Biblioteca multer.js - fazer uploads de arquivos
/**
 * yarn add multer
 * yarn add @types/multer -D
 */

//  o módulo fs do próprio node permite realizar a leitura de arquivos na forma de stream,
//tendo por si próprio varias funções que podem ajudar na leitura e modificação de arquivos via node.js

// csv-parse - é uma biblioteca que ajuda na formatação de arquivos CSV
// --> yarn add csv-parse 

/**
 *	Swagger - Ferramenta de criação de documentações e teste de acessos a aplicação(semelhante ao Postman/Insominia)
	yarn add swagger-ui-express
	yarn add @types/swagger-ui-express -D 

 */

/**
 * Utilizamos o TypeORM qua funciona como um middleware entre a aplicação eo banco de dados
 * e como banco de dados utilizaremos o postgres 
 * documentação completa e comandos estão na página do TypeORM
 * 
 * 0.2.31
 */

/**
 *  Utilização do TSyringe para fazer as injeções de classes 
 * 
 * 	Utilização do daysjs para fazer verificações e comparações de datas 
 * 
 * utilizar o supertest para testes de integração 
 */