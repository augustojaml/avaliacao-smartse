const fakeBid = {
  id: 'b6bc1d71-59da-44fe-a451-68172af95f69',
  auctionId: '6c432689-11ae-4b28-b00c-807ce8b7305b',
  participantId: '428adea7-37e9-4fbe-b508-b17c6bf627b0',
  amount: 15000,
  user: {
    id: '428adea7-37e9-4fbe-b508-b17c6bf627b0',
    fullName: 'John Doe',
    cpf: '07714836008',
  },
}

export type BidProps = typeof fakeBid

export interface BidsResponse {
  bids: BidProps[]
}

export interface ICreateBidProps {
  amount: number
  auctionId: string
}

export interface BindProps {
  id: string
  auctionId: string
  participantId: string
  amount: number
}

export interface BidResponse {
  bid: BidProps
}

interface UserSocketProps {
  id: string
  fullName: string
  cpf: string
}

export interface BidSocketResponseProps {
  id: string
  auctionId: string
  participantId: string
  amount: number
  user: UserSocketProps
}

export interface MaxBidProps {
  id: string
  amount: number
  product: string
  participant: string
}

export interface MaxBidResponse {
  bid: MaxBidProps
}
