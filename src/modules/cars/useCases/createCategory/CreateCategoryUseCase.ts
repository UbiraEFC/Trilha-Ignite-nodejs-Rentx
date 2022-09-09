import { AppError } from "@shared/errors/AppError";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";


interface IRequest {
    name: string;
    description: string;
}
 
@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository) {
        // private dentro do construtor permite que não precisemos declarar uma variavel categoriesRepository
        //antes de coloca-la dentro do constructor 
    }


    async execute({ name, description }: IRequest): Promise<void> {

        // Service não precisa saber que é o nosso tipo de repositório
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new AppError("Category already Exists!");
        }

        await this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase }