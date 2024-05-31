
import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { ServerApp } from './server-app'

describe('Server App', () => {

    
    const options ={
        base: 2,
        limit: 10,
        showTable: false,
        name: 'test-name',
        destination: 'test-destination',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should create ServerApp instance', () => {

        const serverApp = new ServerApp();

        expect( serverApp ).toBeInstanceOf( ServerApp )
        expect( typeof ServerApp.run ).toBe( 'function' )

    });

    test('should run ServerApp with options', () => { 
        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn( CreateTable.prototype, 'execute'  );
        const saveFileSpy = jest.spyOn( SaveFile.prototype, 'execute'  );

        ServerApp.run(options);

        expect( logSpy ).toHaveBeenCalledTimes(2);
        expect( logSpy ).toHaveBeenCalledWith('Server running...');
        expect( logSpy ).toHaveBeenCalledWith('file created!');

        expect( createTableSpy ).toHaveBeenCalledWith({
            base: options.base, limit: options.limit
        });

        expect( saveFileSpy ).toHaveBeenCalledTimes(1);
        expect( saveFileSpy ).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.destination,
            fileName: options.name,
        });
    });

    test('should run with custom values mocked', () => { 

        const logMok = jest.fn();
        const logErrorMok = jest.fn();
        const createMock = jest.fn().mockReturnValue('1 X 2 = 2');
        const saveFileMok = jest.fn().mockReturnValue(true);

        console.log = logMok;
        console.error = logErrorMok;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMok;

        ServerApp.run(options);

        expect( logMok ).toHaveBeenCalledWith('Server running...');
        expect( createMock ).toHaveBeenCalledWith({"base": 2, "limit": 10});
        expect( saveFileMok ).toHaveBeenCalledWith({
            fileContent: '1 X 2 = 2',
            fileDestination: "test-destination",
            fileName: "test-name",
        });
        expect( logMok ).toHaveBeenCalledWith('file created!');

    });

});

