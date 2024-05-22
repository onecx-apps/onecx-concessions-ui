import { TravelConcessionSearchCriteria } from 'src/app/shared/generated';
import { ZodTypeAny, z } from 'zod';
export const travelconcessionSearchCriteriasSchema = z.object({
  principalRole: z.string().optional(),
  customerRelationToPrincipal: z.string().optional(),
  //TODO: Move to docs
  // TODO: it always starts with z.string()
  // if you need transform () -> but this is optional
  // final .optinal()
  // das schema klarmachen
  // über die Beispiele drüberschreiben
  // die dates werden immer auf string gemappt, weil json kein DateTime kann
  /*exampleString: z.string().optional(),
  exampleDate: z.string().optional(),
  exampleDateTime: z.string().optional(),
  exampleEnum: z
    .string()
    .transform((v) => v as travelconcessionSearchRequestExampleEnumEnum)
    .optional(),
  exampleArray: z
    .union([z.string(), z.array(z.string())])
    .transform((v: string | string[] | undefined): string[] | undefined =>
      v instanceof Array || !v
        ? (v as string[] | undefined)
        : ([v] as string[])
    )
    // Here you can add an additional transform to e.g. convert to array of enum
    .optional(),*/
  // ACTION S2: Please define the members for your travelconcessionSearchCriteriasSchema here
} satisfies Partial<Record<keyof TravelConcessionSearchCriteria, ZodTypeAny>>);

export type TravelconcessionSearchCriteria = z.infer<
  typeof travelconcessionSearchCriteriasSchema
>;
