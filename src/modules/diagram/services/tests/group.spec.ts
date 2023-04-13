import { Test, TestingModule } from '@nestjs/testing';
import { ShapeService } from '../shapes.service';
import { ShapeTypeEnum } from '../../dtos/shape.enum';
import { GroupService } from '../groups.service';
import { Group } from '../../dtos/shape.interface';

describe('GroupService', () => {
    let groupService: GroupService;
    let shapeService: ShapeService

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [GroupService, ShapeService],
        }).compile();

        groupService = app.get<GroupService>(GroupService);
        shapeService = app.get<ShapeService>(ShapeService);
    });

    describe('getGroup()', () => {
        it('should return a group by its ID', () => {
            const group: Group = { id: '123', name: 'test', shapes: [] };
            groupService.createGroup(group);
            expect(groupService.getGroup('123')).toBe(group);
        });

        it('should return undefined if no group is found', () => {
            expect(groupService.getGroup('123')).toBeUndefined();
        });
    });

    describe('createGroup()', () => {
        it('should add a group to the list of groups', () => {
            const group: Group = { id: '123', name: 'test', shapes: [] };
            groupService.createGroup(group);
            expect(groupService.getGroup('123')).toBe(group);
        });
    });


    describe('updateGroup()', () => {
        it('should update an existing group', () => {
            const group: Group = { id: '123', name: 'test', shapes: [] };
            groupService.createGroup(group);
            const updates: Partial<Group> = { name: 'updated' };
            const updatedGroup = groupService.updateGroup('123', updates);
            expect(updatedGroup.name).toBe('updated');
        });

        it('should return undefined if no group is found', () => {
            const updates: Partial<Group> = { name: 'updated' };
            const updatedGroup = groupService.updateGroup('123', updates);
            expect(updatedGroup).toBeUndefined();
        });
    });

    describe('deleteGroup()', () => {
        it('should delete an existing group', () => {
            const group: Group = { id: '123', name: 'test', shapes: [] };
            groupService.createGroup(group);
            groupService.deleteGroup('123');
            expect(groupService.getGroup('123')).toBeUndefined();
        });
    });

    describe('addShapeToGroup()', () => {
        it('should add a shape to a group', () => {
            const shapeId = '456';
            const shape = { id: shapeId, type: ShapeTypeEnum.RECTANGLE, x: 0, y: 0, width: 10, height: 10, group: undefined };
            groupService.createGroup({ id: '123', name: 'test', shapes: [] });
            groupService.addShapeToGroup('123', shapeId);
            expect(groupService.getGroup('123').shapes).toContain(shapeId);
            expect(shape.group).toBe('123');
        });
    });

    describe('removeShapeFromGroup()', () => {
        it('should remove a shape from a group', () => {
            const groupId = '123';
            const shapeId = '456';
            const group = { id: groupId, name: 'test', shapes: [shapeId] };
            const shape = { id: shapeId, type: ShapeTypeEnum.CIRCLE, connections: [], x: 0, y: 0, width: 10, height: 10, group: groupId };
            groupService.createGroup(group);
            shapeService.createShape(shape);
            groupService.removeShapeFromGroup(groupId, shapeId);
            expect(groupService.getGroup(groupId)?.shapes).toEqual([]);
            expect(shapeService.getShape(shapeId)?.group).toBeUndefined();
        });
    });
})