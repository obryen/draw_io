import { Injectable } from '@nestjs/common';
import { Shape } from '../dtos/shape.interface';

@Injectable()
export class ShapeService {
  private  shapes: Shape[] = [];

  createShape(shape: Shape): Shape {
    this.shapes.push(shape);
    return shape;
  }

  getShape(id: string): Shape {
    return this.shapes.find(shape => shape.id === id);
  }

  updateShape(id: string, updates: Partial<Shape>): Shape {
    const shape = this.shapes.find(shape => shape.id === id);
    Object.assign(shape, updates);
    return shape;
  }

  deleteShape(id: string): void {
    const index = this.shapes.findIndex(shape => shape.id === id);
    this.shapes.splice(index, 1);
  }

  selectShapes(startX: number, startY: number, stopX: number, stopY: number): Shape[] {
    return this.shapes.filter(shape => {
      const shapeX = shape.x;
      const shapeY = shape.y;
      const shapeWidth = shape.width;
      const shapeHeight = shape.height;
      const isContained = shapeX >= startX && shapeX + shapeWidth <= stopX && shapeY >= startY && shapeY + shapeHeight <= stopY;
      return isContained;
    });
  }

  moveShapes(shapeIds: string[], dx: number, dy: number): void {
    shapeIds.forEach(id => {
      const shape = this.shapes.find(shape => shape.id === id);
      shape.x += dx;
      shape.y += dy;
    });
  }

  resizeShapes(shapeIds: string[], dw: number, dh: number): void {
    shapeIds.forEach(id => {
      const shape = this.shapes.find(shape => shape.id === id);
      shape.width += dw;
      shape.height += dh;
    });
  }

  deleteShapes(shapeIds: string[]): void {
    shapeIds.forEach(id => {
      const index = this.shapes.findIndex(shape => shape.id === id);
      this.shapes.splice(index, 1);
    });
  }
}
