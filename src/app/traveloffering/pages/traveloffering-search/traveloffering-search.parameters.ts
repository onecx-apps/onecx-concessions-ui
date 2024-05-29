
import { TravelOfferingSearchCriteria } from 'src/app/shared/generated';
import { z, ZodTypeAny } from 'zod';

export const travelofferingSearchCriteriasSchema = z.object({
  name: z.string().optional(),
  allowedWagonClass: z.string().optional(),
  remoteId: z.string().optional(),
  state: z.string().optional(),
  group: z.string().optional()
} satisfies Partial<Record<keyof TravelOfferingSearchCriteria, ZodTypeAny>>);

export type TravelofferingSearchCriteria = z.infer<
  typeof travelofferingSearchCriteriasSchema
>;
