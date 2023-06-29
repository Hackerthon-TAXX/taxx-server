import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "ws";

@WebSocketGateway(28080)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  client: Record<string, any>;
  constructor() {
    this.client = {};
  }
  @WebSocketServer()
  server: Server;

  public handleConnection(client): void {
    const uid = String(Number(new Date()));
    console.log("연결:", uid);
    client["id"] = uid;
    this.client[client["id"]] = client;
  }

  public handleDisconnect(client): void {
    console.log("해제:", client["id"]);
    delete this.client[client["id"]];
  }

  @SubscribeMessage("events")
  handleMessage(client: any, payload: any): void {
    for (const [key, value] of Object.entries(this.client)) {
      value.send(
        JSON.stringify({
          id: client["id"],
        })
      );
    }
  }
}
