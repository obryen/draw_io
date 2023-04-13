import { Injectable } from '@nestjs/common';
import { Shape } from '../dtos/shape.interface';

@Injectable()
export class ShapeService {
  private shapes: Shape[] = [];
  /**
    * Creates a new shape.
    * @param shape The shape to create.
    * @returns The created shape.
    */
  createShape(shape: Shape): Shape {
    this.shapes.push(shape);
    return shape;
  }

  /**
   * Gets a shape by its ID.
   * @param id The ID of the shape to get.
   * @returns The shape with the given ID, or null if no shape is found.
   */
  getShape(id: string): Shape {
    return this.shapes.find(shape => shape.id === id) || null;
  }
  /**
   * Updates a shape by its ID.
   * @param id The ID of the shape to update.
   * @param updates The updates to apply to the shape.
   * @returns The updated shape, or null if no shape is found.
   */
  updateShape(id: string, updates: Partial<Shape>): Shape {
    const shape = this.getShape(id);
    if (shape) {
      Object.assign(shape, updates);
      return shape;
    } else {
      return null;
    }
  }
  /**
   * Selects all shapes that are contained within a given rectangle.
   * @param startX The X coordinate of the top-left corner of the rectangle.
   * @param startY The Y coordinate of the top-left corner of the rectangle.
   * @param stopX The X coordinate of the bottom-right corner of the rectangle.
   * @param stopY The Y coordinate of the bottom-right corner of the rectangle.
   * @returns An array of all shapes that are contained within the rectangle.
   */
  selectShapes(startX: number, startY: number, stopX: number, stopY: number): Shape[] {
    //  method is O(n), where n is the number of shapes in the shapes array. 
    // This is because the method iterates over each shape in the array and performs a constant number of operations for each shape, such as accessing its x, y, width, and height properties.
    return this.shapes.filter(shape => {
      const shapeX = shape.x;
      const shapeY = shape.y;
      const shapeWidth = shape.width;
      const shapeHeight = shape.height;
      const isContained = shapeX >= startX && shapeX + shapeWidth <= stopX && shapeY >= startY && shapeY + shapeHeight <= stopY;
      return isContained;
    });
  }
  /**
   * Moves multiple shapes by a given amount.
   * @param shapeIds The IDs of the shapes to move.
   * @param dx The amount to move each shape along the X axis.
   * @param dy The amount to move each shape along the Y axis.
   * @returns True if all shapes were moved successfully, false if any shape is not found.
   */
  moveShapes(shapeIds: string[], dx: number, dy: number): boolean {
    // method is O(m * n), where m is the number of shape IDs in the shapeIds array 
    // and n is the number of shapes in the shapes array. 
    /**
     * (Pros) - no library dependencies, simple and easy to understand
     * (Cons) - Time complexity (Big O) is O(m * n), which can be slow for large numbers of shapes or shape IDs
     */
    let success = true;
    shapeIds.forEach(id => {
      const shape = this.getShape(id);
      if (shape) {
        shape.x += dx;
        shape.y += dy;
      } else {
        success = false;
      }
    });
    return success;
  }

  resizeShapes(shapeIds: string[], dw: number, dh: number): void {
    // method is O(m * n), where m is the number of shape IDs in the shapeIds 
    // array and n is the number of shapes in the shapes array. 
    // has same pros and cons as the move shape
    shapeIds.forEach(id => {
      const shape = this.shapes.find(shape => shape.id === id);
      shape.width += dw;
      shape.height += dh;
    });
  }

  /**
    * Deletes a shape by its ID.
    * @param id The ID of the shape to delete.
    * @returns True if the shape was deleted, false if no shape is found.
    */
  deleteShape(id: string): boolean {
    const index = this.shapes.findIndex(shape => shape.id === id);
    if (index >= 0) {
      this.shapes.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
}
