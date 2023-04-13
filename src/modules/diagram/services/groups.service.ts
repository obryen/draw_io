import { Injectable, Inject } from '@nestjs/common';
import { Group } from '../dtos/shape.interface';
import { ShapeService } from './shapes.service';
@Injectable()
export class GroupService {
    constructor(@Inject(ShapeService) private readonly shapeService: ShapeService) { }
    private readonly groups: Group[] = [];
    /**
      * Creates a group.
      * @param group Object.
      * @returns The group with the given ID, or null if no group is found.
      */
    createGroup(group: Group): Group {
        this.groups.push(group);
        return group;
    }
    /**
     * Gets a group by its ID.
     * @param id The ID of the group to get.
     * @returns The group with the given ID, or null if no group is found.
     */
    getGroup(id: string): Group {
        const group = this.groups.find(group => group.id === id);
        if (!group) {
            console.error(`Group with ID ${id} not found`);
            return null;
        }
        return group;
    }
    /**
     * Updates a group by its ID.
     * @param id The ID of the group to update.
     * @param updates The updates to apply to the group.
     * @returns The updated group, or null if no group is found.
     */
    updateGroup(id: string, updates: Partial<Group>): Group {
        const group = this.getGroup(id);
        if (!group) return null;
        Object.assign(group, updates);
        return group;
    }
    /**
       * Deletes a group by its ID.
       * @param id The ID of the group to delete.
       * @returns True if the group was deleted, false if no group is found.
       */
    deleteGroup(id: string): boolean {
        const index = this.groups.findIndex(group => group.id === id);
        if (index >= 0) {
            this.groups.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }

    /**
 * Adds a shape with the specified ID to the group with the specified ID.
 * @param groupId - The ID of the group to add the shape to.
 * @param shapeId - The ID of the shape to add to the group.
 * @throws An error if the group with the specified ID or the shape with the specified ID does not exist,
 * or if the shape is already in another group.
 * @returns void
 * @complexity O(n), where n is the number of groups in the service.
 */
    addShapeToGroup(groupId: string, shapeId: string): void {
        const group = this.getGroup(groupId);
        group.shapes.push(shapeId);
        const shape = this.shapeService.getShape(shapeId);
        shape.group = groupId;
    }

    /**
 * Removes a shape with the specified ID from the group with the specified ID.
 * @param groupId - The ID of the group to remove the shape from.
 * @param shapeId - The ID of the shape to remove from the group.
 * @throws An error if the group with the specified ID does not exist,
 * or if the shape is not in the group.
 * @returns void
 * @complexity O(n), where n is the number of shapes in the group.
 */
    removeShapeFromGroup(groupId: string, shapeId: string): void {
        const group = this.getGroup(groupId);
        const index = group.shapes.findIndex(id => id === shapeId);
        group.shapes.splice(index, 1);
        const shape = this.shapeService.getShape(shapeId);
        shape.group = undefined;
    }
}



