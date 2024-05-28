import fs from 'fs'
import { yarg } from './plugins/args.plugin'


const base: number = yarg.b

const header: string = `
===================================
        Tabla del ${base}
===================================

`
const limit: number = yarg.l;

let multiplications: string = '' 



for (let i = 1; i <= limit ; i++) {
    
    multiplications = multiplications + `${base} X ${i} = ${base*i}\n`
    
}

const table : string = header + multiplications

if( yarg.s ) console.log(table);

const outputPath = 'outputs'

try {

    fs.mkdirSync( outputPath, { recursive: true } );
    fs.writeFileSync(`${ outputPath }/Tabla_del_${base}.txt`, table);
    
    console.log('Archivo creado exitosamente');
    
    

} catch (error) {
    console.log(error);
       
}    
