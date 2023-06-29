import { Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "ws";

@WebSocketGateway(10009)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private rooms: Record<string, any[]> = {};
  @WebSocketServer() server: Server;

  public handleConnection(client): void {
    client["id"] = this.generateUniqueId();
    // Logger.log(client["id"], "Connection");
  }

  public handleDisconnect(client): void {
    Logger.debug(client["id"], "Disconnect");
    this.removeClientFromRooms(client);
  }

  @SubscribeMessage("joinRoom")
  joinRoom(client: any, room: string): void {
    if (!this.rooms[room]) this.rooms[room] = [];
    this.rooms[room].push(client);
    Logger.log(`${room} - ${client.id}`);
  }

  @SubscribeMessage("leaveRoom")
  leaveRoom(client: any, room: string): void {
    const roomClients = this.rooms[room];

    if (roomClients) {
      this.removeClientFromRoom(client, room, roomClients);
    }
  }

  @SubscribeMessage("events")
  handleMessage(client: any, payload: any): void {
    for (const [room, clients] of Object.entries(this.rooms)) {
      if (clients.includes(client)) {
        this.sendPayloadToOtherClients(client, clients, payload);
        break;
      }
    }
  }

  private removeClientFromRooms(client): void {
    for (const [room, clients] of Object.entries(this.rooms)) {
      this.removeClientFromRoom(client, room, clients);
    }
  }

  private removeClientFromRoom(client, room, clients): void {
    const clientIndex = clients.indexOf(client);

    if (clientIndex !== -1) {
      clients.splice(clientIndex, 1);
    }
  }

  private sendPayloadToOtherClients(client, clients, payload): void {
    clients.filter((roomClient) => roomClient !== client).forEach((roomClient) => roomClient.send(JSON.stringify(payload)));
  }

  private generateUniqueId(): string {
    return String(Number(new Date()));
  }
}
