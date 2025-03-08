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

export interface MaxBidProps {
  id: string
  auctionId: string
  participantId: string
  amount: number
  user: {
    id: string
    fullName: string
    cpf: string
  }
}

export interface MaxBidResponse {
  bid: MaxBidProps
}

interface AuctionTimerInfo {
  timer: NodeJS.Timeout
  expiresAt: number
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
  private auctionTimers: Map<string, AuctionTimerInfo> = new Map()

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

  sendMessageToAll(mensagem: string) {
    this.server.emit('broadcast', mensagem)
  }

  sendBidToAll(bid: MaxBidProps) {
    this.server.emit('broadcast', bid)
    this.resetAuctionTimer(bid.auctionId)
  }

  private startAuctionTimer(auctionId: string) {
    const expiresAt = Date.now() + 2 * 60 * 1000

    this.clearAuctionTimer(auctionId)

    const timer = setTimeout(
      () => {
        this.server.emit('auction-timer-expired', {
          auctionId,
          message: 'Nenhum lance recebido no período de 2 minutos',
        })
        this.auctionTimers.delete(auctionId)
      },
      2 * 60 * 1000,
    )

    this.auctionTimers.set(auctionId, { timer, expiresAt })

    this.server.emit('auction-timer-sync', {
      auctionId,
      expiresAt,
    })
  }

  private clearAuctionTimer(auctionId: string) {
    const timerInfo = this.auctionTimers.get(auctionId)
    if (timerInfo) {
      clearTimeout(timerInfo.timer)
      this.auctionTimers.delete(auctionId)
    }
  }

  private resetAuctionTimer(auctionId: string) {
    this.startAuctionTimer(auctionId)
  }

  @SubscribeMessage('start-auction-timer')
  handleStartAuctionTimer(client: Socket, payload: { auctionId: string }) {
    const existingTimer = this.auctionTimers.get(payload.auctionId)

    if (existingTimer) {
      client.emit('auction-timer-sync', {
        auctionId: payload.auctionId,
        expiresAt: existingTimer.expiresAt,
      })
    } else {
      this.startAuctionTimer(payload.auctionId)
    }
  }

  @SubscribeMessage('get-auction-timer')
  handleGetAuctionTimer(client: Socket, payload: { auctionId: string }) {
    const timerInfo = this.auctionTimers.get(payload.auctionId)

    if (timerInfo) {
      client.emit('auction-timer-sync', {
        auctionId: payload.auctionId,
        expiresAt: timerInfo.expiresAt,
      })
    } else {
      client.emit('auction-timer-sync', {
        auctionId: payload.auctionId,
        expiresAt: null,
      })
    }
  }

  @SubscribeMessage('new-auction')
  handleNewtAuction(client: Socket, payload: { auctionId: string }) {
    // console.log(payload)
    this.server.emit('new-auction', payload)
  }
}
