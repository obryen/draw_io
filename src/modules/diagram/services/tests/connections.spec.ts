import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from '../../dtos/shape.interface';
import { ConnectionService } from '../connections.service';
import { ShapeTypeEnum } from '../../dtos/shape.enum';

describe('ConnectionService', () => {
    let connectionService: ConnectionService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [ConnectionService],
        }).compile();

        connectionService = app.get<ConnectionService>(ConnectionService);
    });

    describe('createConnection()', () => {
        it('should create a new connection and add it to the list of connections', () => {
            const connection: Connection = { id: '1', type: 'line', startConnectionPoint: '2', endConnectionPoint: '3', startShape: ShapeTypeEnum.RECTANGLE, endShape: ShapeTypeEnum.TRIANGLE };
            const createdConnection = connectionService.createConnection(connection);
            expect(createdConnection).toEqual(connection);
            expect(connectionService.getConnection('1')).toEqual(connection);
        });
    });

    describe('getConnection()', () => {
        it('should return the connection with the given ID', () => {
            const connection: Connection = { id: '1', type: 'line', startConnectionPoint: '2', endConnectionPoint: '3', startShape: ShapeTypeEnum.RECTANGLE, endShape: ShapeTypeEnum.TRIANGLE };
            connectionService.createConnection(connection);
            expect(connectionService.getConnection('1')).toEqual(connection);
        });

        it('should return undefined if the connection with the given ID is not found', () => {
            expect(connectionService.getConnection('1')).toBeUndefined();
        });
    });

    describe('updateConnection()', () => {
        it('should update the connection with the given ID', () => {
            const connection: Connection = { id: '1', type: 'line', startConnectionPoint: '2', endConnectionPoint: '3', startShape: ShapeTypeEnum.RECTANGLE, endShape: ShapeTypeEnum.TRIANGLE };
            const updatedConnection: Partial<Connection> = { startConnectionPoint: '4' };
            connectionService.createConnection(connection);
            const result = connectionService.updateConnection('1', updatedConnection);
            expect(result.startConnectionPoint).toEqual(updatedConnection.startConnectionPoint);
            expect(connectionService.getConnection('1')).toEqual({ ...connection, ...updatedConnection });
        });

        it('should return undefined if the connection with the given ID is not found', () => {
            const result = connectionService.updateConnection('1', { startConnectionPoint: '2' });
            expect(result).toBeUndefined();
        });
    });

    describe('deleteConnection()', () => {
        it('should delete the connection with the given ID', () => {
            const connection: Connection = { id: '1', type: 'line', startConnectionPoint: '2', endConnectionPoint: '3', startShape: ShapeTypeEnum.RECTANGLE, endShape: ShapeTypeEnum.TRIANGLE };
            connectionService.createConnection(connection);
            connectionService.deleteConnection('1');
            expect(connectionService.getConnection('1')).toBeUndefined();
        });
    });
});
