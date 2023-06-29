import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';

/**
 * 이벤트 관련 웹소켓 게이트웨이입니다.
 */
@WebSocketGateway(10009)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private rooms: Record<string, any[]> = {};
  @WebSocketServer() server: Server;

  /**
   * 클라이언트와의 연결이 맺어졌을 때 호출되는 메서드입니다.
   * @param {any} client - 연결된 클라이언트
   */
  public handleConnection(client: any): void {
    client['id'] = this.generateUniqueId();
    // Logger.log(client["id"], "Connection");
  }

  /**
   * 클라이언트와의 연결이 종료되었을 때 호출되는 메서드입니다.
   * @param {any} client - 연결이 종료된 클라이언트
   */
  public handleDisconnect(client: any): void {
    Logger.debug(client['id'], 'Disconnect');
    this.removeClientFromRooms(client);
  }

  /**
   * 클라이언트가 특정 방에 참여하는 메시지 핸들러입니다.
   * @param {any} client - 클라이언트
   * @param {string} room - 참여할 방의 식별자
   */
  @SubscribeMessage('joinRoom')
  joinRoom(client: any, room: string): void {
    if (!this.rooms[room]) this.rooms[room] = [];
    this.rooms[room].push(client);
    Logger.log(`${room} - ${client.id}`);
  }

  /**
   * 클라이언트가 특정 방을 떠나는 메시지 핸들러입니다.
   * @param {any} client - 클라이언트
   * @param {string} room - 떠날 방의 식별자
   */
  @SubscribeMessage('leaveRoom')
  leaveRoom(client: any, room: string): void {
    const roomClients = this.rooms[room];

    if (roomClients) {
      this.removeClientFromRoom(client, room, roomClients);
    }
  }

  /**
   * 클라이언트로부터 받은 이벤트 메시지를 처리하는 메시지 핸들러입니다.
   * @param {any} client - 클라이언트
   * @param {any} payload - 이벤트 메시지 페이로드
   */
  @SubscribeMessage('events')
  handleMessage(client: any, payload: any): void {
    for (const [room, clients] of Object.entries(this.rooms)) {
      if (clients.includes(client)) {
        this.sendPayloadToOtherClients(client, clients, payload);
        break;
      }
    }
  }

  private removeClientFromRooms(client: any): void {
    for (const [room, clients] of Object.entries(this.rooms)) {
      this.removeClientFromRoom(client, room, clients);
    }
  }

  private removeClientFromRoom(
    client: any,
    room: string,
    clients: any[],
  ): void {
    const clientIndex = clients.indexOf(client);

    if (clientIndex !== -1) {
      clients.splice(clientIndex, 1);
    }
  }

  private sendPayloadToOtherClients(
    client: any,
    clients: any[],
    payload: any,
  ): void {
    clients
      .filter((roomClient) => roomClient !== client)
      .forEach((roomClient) => roomClient.send(JSON.stringify(payload)));
  }

  private generateUniqueId(): string {
    return String(Number(new Date()));
  }
}
