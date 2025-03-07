import { z } from 'zod'

export const updateActionStatusSchema = z.object({
  status: z.enum(['waiting', 'open', 'closed'], {
    errorMap: () => ({
      message: "Status must be 'waiting', 'open', or 'closed'",
    }),
  }),
})

export type UpdateActionStatusZodSchema = z.infer<
  typeof updateActionStatusSchema
>
