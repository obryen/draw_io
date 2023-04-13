import { Injectable } from '@nestjs/common';
import { Connection } from '../dtos/shape.interface';
@Injectable()
export class ConnectionService {
  private readonly connections: Connection[] = [];

  createConnection(connection: Connection): Connection {
    this.connections.push(connection);
    return connection;
  }

  getConnection(id: string): Connection {
    return this.connections.find(connection => connection.id === id);
  }

  updateConnection(id: string, updates: Partial<Connection>): Connection {
    const connection = this.connections.find(connection => connection.id === id);
    Object.assign(connection, updates);
    return connection;
  }

  deleteConnection(id: string): void {
    const index = this.connections.findIndex(connection => connection.id === id);
    this.connections.splice(index, 1);
  }
}
