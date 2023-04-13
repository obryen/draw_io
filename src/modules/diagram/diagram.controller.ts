import { Controller, Body, Param, Get, Post, Put, Delete } from '@nestjs/common';
import { ConnectionService } from './services/connections.service';
import { GroupService } from './services/groups.service';
import { ShapeService } from './services/shapes.service';
import { Connection, Group, Shape } from './dtos/shape.interface';

@Controller('')
export class DiagramController {
  constructor(private readonly shapeService: ShapeService,
    private readonly groupService: GroupService,
    private readonly connectionService: ConnectionService) { }

  @Post('shapes')
  createShape(@Body() shape: Shape): Shape {
    return this.shapeService.createShape(shape);
  }

  @Get('shapes/:id')
  getShape(@Param('id') id: string): Shape {
    return this.shapeService.getShape(id);
  }

  @Put('shapes/:id')
  updateShape(@Param('id') id: string, @Body() updates: Partial<Shape>): Shape {
    return this.shapeService.updateShape(id, updates);
  }


  @Delete('shapes/:id')
  deleteShape(@Param('id') id: string): boolean {
    return this.shapeService.deleteShape(id);
  }

  @Post('connections')
  createConnection(@Body() connection: Connection): Connection {
    return this.connectionService.createConnection(connection);
  }

  @Get('connections/:id')
  getConnection(@Param('id') id: string): Connection {
    return this.connectionService.getConnection(id);
  }

  @Put('connections/:id')
  updateConnection(@Param('id') id: string, @Body() updates: Partial<Connection>): Connection {
    return this.connectionService.updateConnection(id, updates);
  }

  @Delete('connections/:id')
  deleteConnection(@Param('id') id: string): void {
    return this.connectionService.deleteConnection(id);
  }

  @Post('groups')
  createGroup(@Body() group: Group): Group {
    return this.groupService.createGroup(group);
  }

  @Get('groups/:id')
  getGroup(@Param('id') id: string): Group {
    return this.groupService.getGroup(id);
  }

  @Put('groups/:id')
  updateGroup(@Param('id') id: string, @Body() updates: Partial<Group>): Group {
    return this.groupService.updateGroup(id, updates);
  }

  @Delete('groups/:id')
  deleteGroup(@Param('id') id: string): boolean {
    return this.groupService.deleteGroup(id);
  }

  @Post('select')
  selectShapes(@Body() { startX, startY, stopX, stopY }): Shape[] {
    return this.shapeService.selectShapes(startX, startY, stopX, stopY);
  }

  @Put('move')
  moveShapes(@Body() { shapeIds, dx, dy }): boolean {
    return this.shapeService.moveShapes(shapeIds, dx, dy);
  }

  @Put('resize')
  resizeShapes(@Body() { shapeIds, dw, dh }): void {
    return this.shapeService.resizeShapes(shapeIds, dw, dh);
  }

  @Put('groups/:id/add')
  addShapeToGroup(@Param('id') groupId: string, @Body() { shapeId }): void {
    return this.groupService.addShapeToGroup(groupId, shapeId);
  }

  @Put('groups/:id/remove')
  removeShapeFromGroup(@Param('id') groupId: string, @Body() { shapeId }): void {
    return this.groupService.removeShapeFromGroup(groupId, shapeId);
  }
}
