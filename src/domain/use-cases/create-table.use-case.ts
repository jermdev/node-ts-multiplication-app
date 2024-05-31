
export interface CreateTableUseCase {
    execute: ( options: CreateTableOptions ) => string;
} 

export interface CreateTableOptions {
    base: number;
    limit?: number;
}

export class CreateTable implements CreateTableUseCase {

    constructor() {
        
        /**
         * DI - Dependency Injection  
         */

    }

    execute({ base, limit = 10 }: CreateTableOptions ) {
        let multiplications = ''
        for (let i = 1; i <= limit ; i++) {
    
            multiplications = multiplications + `${base} X ${i} = ${base*i}`
            
            if ( i < limit ) multiplications += '\n'

        }

        return multiplications
    }

}

