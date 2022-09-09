//Os outros dois tipo de repositórios são subtipos de ICategoriesRepository
import { Category } from "../infra/typeorm/entities/Category";

// DTO  => Data tranfer object
// Estudar interface - Define um "Contrado de variaveis e types que deverão existir "
interface ICreateCategoryDTO {
    name: string;
    description: string;
}


interface ICategoriesRepository {
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create({name, description}: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDTO }