import { BidToastProvider } from '../shared/providers/ToastBidMessage'
import { AuctionHeader } from './components/auction-header'

export default function AuctionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="bg-background-light font-display dark:bg-background-dark h-full w-full overflow-hidden">
      <AuctionHeader />
      <div className="custom-scroll mb-40 h-full overflow-hidden">
        <div className="custom-scroll relative h-full w-full overflow-scroll pb-24">
          <BidToastProvider>
            <div className="flex flex-col space-y-4 px-8 pt-24">{children}</div>
          </BidToastProvider>
        </div>
      </div>
    </div>
  )
}
