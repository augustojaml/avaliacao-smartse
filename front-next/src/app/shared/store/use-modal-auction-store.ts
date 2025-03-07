import { create } from 'zustand'

interface AuctionItem {
  name: string
  quantity: number
  initialPrice: number
  startTime: string
  endTime: string
}

interface ModalAuctionStore {
  isOpen: boolean
  editItem: AuctionItem | null
  onOpenNew: () => void
  onOpenEdit: (item: AuctionItem) => void
  onClose: () => void
}

export const useModalAuctionStore = create<ModalAuctionStore>((set) => ({
  isOpen: false,
  editItem: null,

  onOpenNew: () => set({ isOpen: true, editItem: null }),
  onOpenEdit: (item) => set({ isOpen: true, editItem: item }),
  onClose: () => set({ isOpen: false, editItem: null }),
}))
