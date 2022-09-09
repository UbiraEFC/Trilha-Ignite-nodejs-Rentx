import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

// Utilização de Decorators  para referinciar as colunas no Banco de dados 

@Entity("categories")
class Category {

    //@Column("nome") // caso queira referenciar outro nome 
    @PrimaryColumn()
    id?: string; // opcional

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;


    constructor () {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
};

export { Category };