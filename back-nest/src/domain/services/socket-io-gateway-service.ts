import { Logger } from '@nestjs/common'
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

interface UserProps {
  id: string
  fullName: string
  cpf: string
}

interface BidResponseProps {
  id: string
  auctionId: string
  participantId: string
  amount: number
  user: UserProps
}

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class SocketIoGatewayService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server

  private logger = new Logger('SocketIoGateway')

  afterInit() {
    this.logger.log('Socket.IO inicializado')
  }

  handleConnection(client: Socket) {
    this.logger.log(`Cliente conectado: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado: ${client.id}`)
  }

  @SubscribeMessage('mensagem')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleMessage(client: Socket, payload: any) {
    this.server.emit('resposta', {
      remetente: client.id,
      mensagem: payload,
    })
  }

  // Método para enviar mensagens broadcast
  sendMessageToAll(mensagem: string) {
    this.server.emit('broadcast', mensagem)
  }

  sendBidToAll(bid: BidResponseProps) {
    this.server.emit('broadcast', bid)
  }
}
