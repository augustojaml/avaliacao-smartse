export type StatusProps = 'open' | 'closed' | 'waiting'

export interface AuctionProps {
  id: string
  itemName: string
  quantity: number
  initialPrice: number
  startTime: string
  endTime: string
  status: StatusProps
  creatorId: string
}

export interface CreateAuctionProps {
  itemName: string
  quantity: number
  initialPrice: number
  startTime: Date
  endTime: Date
}

export interface AuctionsResponse {
  auctions: AuctionProps[]
}

export interface AuctionResponse {
  auction: AuctionProps
}
