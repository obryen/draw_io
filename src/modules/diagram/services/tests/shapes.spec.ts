import { ShapeTypeEnum } from "../../dtos/shape.enum";
import { Shape } from "../../dtos/shape.interface";
import { ShapeService } from "../shapes.service";


describe('ShapeService', () => {
    let service: ShapeService;
    let shapeInstance: Shape;
    beforeEach(() => {
        service = new ShapeService();
    });

    describe('createShape', () => {
        it('should create a new shape and add it to the shapes array', () => {
            const newShape: Shape = { id: '1', connections: [], type: ShapeTypeEnum.CIRCLE, x: 0, y: 0, width: 10, height: 10 };
            const createdShape = service.createShape(newShape);

            expect(createdShape).toEqual(newShape);
            expect(service['shapes']).toContain(newShape);
        });
    });

    describe('getShape', () => {
        it('should return the shape with the specified id', () => {
            const shape: Shape = { id: '1', connections: [], type: ShapeTypeEnum.RECTANGLE, x: 0, y: 0, width: 10, height: 10 };
            service['shapes'].push(shape);

            const returnedShape = service.getShape('1');

            expect(returnedShape).toEqual(shape);
        });
    });

    describe('updateShape', () => {
        it('should update the specified shape with the given updates', () => {
            const shape: Shape = { id: '1', connections: [], type: ShapeTypeEnum.RECTANGLE, x: 0, y: 0, width: 10, height: 10 };
            service['shapes'].push(shape);

            const updates = { x: 5, y: 5 };
            const updatedShape = service.updateShape('1', updates);

            expect(updatedShape).toEqual({ ...shape, ...updates });
            expect(service['shapes']).toContainEqual(updatedShape);
        });
    });

    describe('deleteShape', () => {
        it('should remove the specified shape from the shapes array', () => {
            const shape: Shape = { id: '1', connections: [], type: ShapeTypeEnum.TRIANGLE, x: 0, y: 0, width: 10, height: 10 };
            service['shapes'].push(shape);

            service.deleteShape('1');

            expect(service['shapes']).not.toContain(shape);
        });
    });

    // describe('selectShapes', () => {
    //     it('should return an array of shapes that are contained within the specified selection', () => {
    //         const shape1: Shape = { id: '1', connections: [], type: ShapeTypeEnum.RECTANGLE, x: 0, y: 0, width: 10, height: 10 };
    //         const shape2: Shape = { id: '2', connections: [], type: ShapeTypeEnum.RECTANGLE, x: 5, y: 5, width: 10, height: 10 };
    //         const shape3: Shape = { id: '3', connections: [], type: ShapeTypeEnum.RECTANGLE, x: 15, y: 15, width: 10, height: 10 };
    //         service['shapes'].push(shape1, shape2, shape3);

    //         const selectedShapes = service.selectShapes(3, 3, 12, 12);

    //         expect(selectedShapes).toContain(shape1);
    //         expect(selectedShapes).toContain(shape2);
    //         expect(selectedShapes).not.toContain(shape3);
    //     });
    // });

    describe('selectShapes', () => {
        beforeEach(() => {
            service['shapes'] = [
                { id: '1', connections: [], type: ShapeTypeEnum.RECTANGLE, x: 0, y: 0, width: 10, height: 10 },
                { id: '2', connections: [], type: ShapeTypeEnum.RECTANGLE, x: 5, y: 5, width: 10, height: 10 },
                { id: '3', connections: [], type: ShapeTypeEnum.RECTANGLE, x: 15, y: 15, width: 10, height: 10 },
            ];
        });

        it('should return an empty array if no shapes are within the selection area', () => {
            const selectedShapes = service.selectShapes(100, 100, 110, 110);
            expect(selectedShapes).toEqual([]);
        });

        it('should return all shapes if the selection area contains all shapes', () => {
            const selectedShapes = service.selectShapes(0, 0, 40, 40);
            expect(selectedShapes).toEqual(service['shapes']);
        });

        it('should return a single shape if the selection area contains only one shape', () => {
            const selectedShapes = service.selectShapes(0, 0, 10, 10);
            expect(selectedShapes).toContainEqual({ id: '1', type: 'rectangle', x: 0, y: 0, width: 10, height: 10, connections: [] });
            expect(selectedShapes).not.toContainEqual({ id: '2', type: 'rectangle', x: 15, y: 15, width: 10, height: 10 });
            expect(selectedShapes).not.toContainEqual({ id: '3', type: 'rectangle', x: 30, y: 30, width: 10, height: 10 });
        });

        it('should not return shapes that overlap with the selection area', () => {
            const selectedShapes = service.selectShapes(0, 0, 20, 20);
            expect(selectedShapes).toContainEqual({ id: '2', type: 'rectangle', x: 5, y: 5, width: 10, height: 10, connections: [] });
            expect(selectedShapes).not.toContainEqual({ id: '1', type: 'rectangle', x: 0, y: 0, width: 0, height: 10, connections: [] });
            expect(selectedShapes).not.toContainEqual({ id: '3', type: 'rectangle', x: 30, y: 30, width: 10, height: 10, connections: [] });
        });
    });


    describe('moveShapes', () => {
        beforeEach(() => {
            service['shapes'] = [
                { id: '1', type: ShapeTypeEnum.RECTANGLE, connections: [], x: 0, y: 0, width: 10, height: 10 },
                { id: '2', type: ShapeTypeEnum.RECTANGLE, connections: [], x: 15, y: 15, width: 10, height: 10 },
                { id: '3', type: ShapeTypeEnum.RECTANGLE, connections: [], x: 30, y: 30, width: 10, height: 10 },
            ];
        });

        it('should move the specified shapes by the given amount', () => {
            service.moveShapes(['1', '3'], 5, 10);
            console.log('first item', service['shapes'][0]);
            console.log('second item', service['shapes'][2]);
            expect(service['shapes'][0]).toEqual({ id: '1', type: 'rectangle', x: 5, y: 10, width: 10, height: 10, connections: [], });
            expect(service['shapes'][2]).toEqual({ id: '3', type: 'rectangle', x: 35, y: 40, width: 10, height: 10, connections: [], });
        });

        it('should not move shapes that are not specified', () => {
            service.moveShapes(['1'], 5, 10);

            expect(service['shapes'][0]).toEqual({ id: '1', type: 'rectangle', x: 5, y: 10, width: 10, height: 10, connections: [], });
            expect(service['shapes'][1]).toEqual({ id: '2', type: 'rectangle', x: 15, y: 15, width: 10, height: 10, connections: [], });
            expect(service['shapes'][2]).toEqual({ id: '3', type: 'rectangle', x: 30, y: 30, width: 10, height: 10, connections: [], });
        });
    });
});