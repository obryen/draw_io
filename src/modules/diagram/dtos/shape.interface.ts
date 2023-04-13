import { ConnectionTypeEnum, ShapeTypeEnum } from "./shape.enum";

export class Shape {
  id: string;
  type: ShapeTypeEnum; // e.g., circle, rectangle, triangle
  x: number;
  y: number;
  width: number;
  height: number;
  connections: Connection[];
  group?: string; // the id of the group this shape belongs to, if any
}

export class Connection {
  id: string;
  startShape: string; // the id of the shape where the connection starts
  startConnectionPoint: string; // the id of the connection point where the connection starts
  endShape: string; // the id of the shape where the connection ends
  endConnectionPoint: string; // the id of the connection point where the connection ends
  type: string; // e.g., line, arrow
}

export class ConnectionPoint {
  id: string;
  type: ConnectionTypeEnum; // e.g., input, output
  x: number;
  y: number;
  connectedTo?: string; // the id of the connection that is currently connected to this connection point, if any
}

export class Group {
  id: string;
  name: string;
  shapes: string[]; // an array of shape ids that belong to this group
}
