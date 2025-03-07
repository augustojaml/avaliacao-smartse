import { z } from 'zod'

const createBidZodSchema = z.object({
  auctionId: z.string().min(1, 'Auction id is required'),
  amount: z.number().positive('Amount must be a positive number'),
})

export type CreateBidZodSchema = z.infer<typeof createBidZodSchema>

export { createBidZodSchema }
