import { Injectable, Inject } from '@nestjs/common';
import { Group } from '../dtos/shape.interface';
import { ShapeService } from './shapes.service';
@Injectable()
export class GroupService {
    constructor(@Inject(ShapeService) private readonly shapeService: ShapeService) { }
    private readonly groups: Group[] = [];

    createGroup(group: Group): Group {
        this.groups.push(group);
        return group;
    }

    getGroup(id: string): Group {
        return this.groups.find(group => group.id === id);
    }

    updateGroup(id: string, updates: Partial<Group>): Group {
        const group = this.groups.find(group => group.id === id);
        Object.assign(group, updates);
        return group;
    }

    deleteGroup(id: string): void {
        const index = this.groups.findIndex(group => group.id === id);
        this.groups.splice(index, 1);
    }

    addShapeToGroup(groupId: string, shapeId: string): void {
        const group = this.groups.find(group => group.id === groupId);
        group.shapes.push(shapeId);
        const shape = this.shapeService.getShape(shapeId);
        shape.group = groupId;
    }

    removeShapeFromGroup(groupId: string, shapeId: string): void {
        const group = this.groups.find(group => group.id === groupId);
        const index = group.shapes.findIndex(id => id === shapeId);
        group.shapes.splice(index, 1);
        const shape = this.shapeService.getShape(shapeId);
        shape.group = undefined;
    }
}



