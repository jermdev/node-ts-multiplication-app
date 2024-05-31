import  fs, { write, writeFile, writeFileSync }  from 'fs';
import { SaveFile } from './save-file.use-case';
import path from 'path';

describe('SaveFileUseCase', () => {

    
    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs/file-destiantion',
        fileName: 'custom-table-name' ,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    })

    afterEach(() => {
        // clean up
        if (fs.existsSync('outputs')) fs.rmSync('outputs',{ recursive: true });

        if (fs.existsSync(customOptions.fileDestination)) fs.rmSync(customOptions.fileDestination,{ recursive: true });
        
    });

    test('should save file with default values', () => {

        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt'
        const options = {
            fileContent: 'test content'
        }

        const result = saveFile.execute(options);

        
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
        
        
        expect( result ).toBeTruthy;
        expect( fileExists ).toBe( true );
        expect( fileContent ).toBe( options.fileContent )

    });

    test('should save file with custom values', () => {

        const saveFile = new SaveFile();
        

        const result = saveFile.execute(customOptions);

        
        const fileExists = fs.existsSync(customOptions.fileDestination);
        const fileContent = fs.readFileSync(`${customOptions.fileDestination}/${customOptions.fileName}.txt`, { encoding: 'utf-8' });

        const fileName = path.basename(customOptions.fileName)

        expect( result ).toBeTruthy;
        expect( fileName ).toBe(customOptions.fileName)
        expect( fileExists ).toBe( true );
        expect( fileContent ).toBe( customOptions.fileContent )
        
        

    });

    test('should return false if directory could not be created', () => {

        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is a custom error massage from testing') }
        );

        const result = saveFile.execute(customOptions);

        expect( result ).toBe( false );

        mkdirSpy.mockRestore();

    });

    test('should return false if file could not be created', () => {

        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This is a custom error massage from testing') }
        );

        const result = saveFile.execute({ fileContent: 'hola' });

        expect( result ).toBe( false );

        writeFileSpy.mockRestore();

    });

})