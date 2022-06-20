import{
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server} from 'socket.io';



import { Logger} from '@nestjs/common';

import { DataService } from './data.service';

import {Client } from 'socket.io/dist/client';
import { PythonService } from './python.service';
import { channel } from 'diagnostics_channel';




@WebSocketGateway({transports: ['websocket'] })
export class AppGateway {

  private readonly logger = new Logger(AppGateway.name);

  @WebSocketServer()
  server: Server

  constructor(private readonly dataService: DataService,
   
  ) {
    this.dataService.Output.subscribe(
      (output) =>{
        this.server.emit('output', output);
      }
    )
  }

  @SubscribeMessage('input')
  Input(@MessageBody() data:{a: number, b: number}){
    //this.logger.log(`DATA RECEIVED: ${JSON.stringify(data)}`);
    this.dataService.input(data);
  }

  handleDisconnect(client: Client): void{
    this.logger.log(`CLIENT: ${client.id} DISCONNECTED`);
  }

  handleConnection(client: Client, ..._args: any[]): void{
    this.logger.log(`CLIENT: ${client.id} CONNECTED`);
  }




}
