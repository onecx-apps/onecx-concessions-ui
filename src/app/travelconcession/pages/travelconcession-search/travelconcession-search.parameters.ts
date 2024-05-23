import { TravelConcessionSearchCriteria } from 'src/app/shared/generated';
import { ZodTypeAny, z } from 'zod';
export const travelconcessionSearchCriteriasSchema = z.object({
  principalRole: z.string().optional(),
  customerRelationToPrincipal: z.string().optional(),
  offeringName: z.string().optional(),
  state: z.string().optional()
} satisfies Partial<Record<keyof TravelConcessionSearchCriteria, ZodTypeAny>>);

export type TravelconcessionSearchCriteria = z.infer<
  typeof travelconcessionSearchCriteriasSchema
>;
