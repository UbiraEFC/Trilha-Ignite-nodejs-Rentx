import { getRepository, Repository } from "typeorm";
import { ICategoriesRepository, ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository";
import { Category } from "../entities/Category";

// DTO  => Data tranfer object
// Estudar interface - Define um "Contrado de variaveis e types que deverão existir "

class CategoriesRepository implements ICategoriesRepository {

    private repository: Repository<Category>;
    /**
     *  A public variable is accessible from anywhere (well, anywhere where the class is accessible).

        A private variable is only accessible inside the class.

        A static variable belongs to the class rather than to an instance of a class.

     */

    // Estudar constructors
    /**
     *      O Constructor é um método especial para criar e inicializar 
     *  um objeto criado a partir de uma classe, apenas um metodo constructor 
     *  pode existir por classe.
     *      Um constructor pode usar a palavra reservada super() para se 
     *  referir ao construtor da classe pai(SUPERIOR)
     */
    //private static INSTANCE: CategoriesRepository; // Padrão de projeto Singleton

     constructor () {
        this.repository = getRepository(Category);
    }

    // public static getInstance(): CategoriesRepository {

    //     if(!CategoriesRepository.INSTANCE) {
    //         CategoriesRepository.INSTANCE = new CategoriesRepository();
    //     }

    //     return CategoriesRepository.INSTANCE;
    // }

    // Estudar void - Devemos declarar o tipo de retorno que aquela função irá retornar
    // caso não aja retorno retornaremos VOID=vazio
    async create ({description, name} : ICreateCategoryDTO): Promise<void>  {

        const category = this.repository.create({
            description,
            name
        });
        /**
         * O método Object.assign() é usado para copiar os valores de todas as propriedades
         *  próprias enumeráveis de um ou mais objetos de origem para um objeto destino. 
         * Este método irá retornar o objeto destino.
         */
        // Object.assign(category, {
        // name,
        // description,
        // created_at: new Date()
        // });

        await this.repository.save(category);
    };

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    };
    
    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name });
        return category;
    }
};

export { CategoriesRepository }