import { Injectable } from '@nestjs/common';
import { Connection } from '../dtos/shape.interface';
@Injectable()
export class ConnectionService {
  private readonly connections: Connection[] = [];
  /**
   * Adds a new connection to the service.
   * @param connection - The connection object to add.
   * @returns The connection object that was added.
   * @complexity O(1).
   */
  createConnection(connection: Connection): Connection {
    this.connections.push(connection);
    return connection;
  }

  /**
 * Gets the connection object with the specified ID.
 * @param id - The ID of the connection object to retrieve.
 * @returns The connection object with the specified ID, or undefined if not found.
 * @complexity O(n), where n is the number of connections in the connections array.
 */
  getConnection(id: string): Connection {
    return this.connections.find(connection => connection.id === id);
  }
  /**
   * Gets the connection object with the specified ID.
   * @param id - The ID of the connection object to retrieve.
   * @returns The connection object with the specified ID, or undefined if not found.
   * @complexity O(n), where n is the number of connections in the connections array.
   */
  updateConnection(id: string, updates: Partial<Connection>): Connection {
    const connection = this.getConnection(id);
    if (connection) {
      Object.assign(connection, updates);
      return connection;
    } else {
      return null;
    }
  }

  /**
   * Deletes the connection with the specified ID.
   * @param id - The ID of the connection object to delete.
   * @throws An error if the connection with the specified ID is not found.
   * @returns void
   * @complexity O(n), where n is the number of connections in the connections array.
   */
  deleteConnection(id: string): void {
    const index = this.connections.findIndex(connection => connection.id === id);
    this.connections.splice(index, 1);
  }
}
