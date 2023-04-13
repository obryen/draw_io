import { Module } from '@nestjs/common';
import { ShapeService } from './services/shapes.service';
import { GroupService } from './services/groups.service';
import { ConnectionService } from './services/connections.service';
import { DiagramController } from './diagram.controller';


@Module({
  imports: [

  ],
  controllers: [DiagramController],
  providers: [ShapeService, GroupService, ConnectionService],
})
export class DiagramModule { }