import { z } from 'zod'

const createAuctionSchema = z
  .object({
    itemName: z.string().min(1, 'Item name is required'),
    quantity: z.number().int().positive('Quantity must be a positive integer'),
    initialPrice: z
      .number()
      .positive('Initial price must be greater than zero'),
    startTime: z.coerce.date().refine((startTime) => startTime >= new Date(), {
      message: 'Start time cannot be in the past',
    }),
    endTime: z.coerce.date(),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: 'End time must be after start time',
    path: ['endTime'],
  })

export type CreateAuctionZodSchema = z.infer<typeof createAuctionSchema>

export { createAuctionSchema }
