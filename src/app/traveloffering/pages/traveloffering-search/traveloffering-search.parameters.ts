
import { TravelOfferingSearchCriteria } from 'src/app/shared/generated';
import { z, ZodTypeAny } from 'zod';

export const travelofferingSearchCriteriasSchema = z.object({
  // changeMe: z.string().optional(),
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
    .transform((v) => v as travelofferingSearchRequestExampleEnumEnum)
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
  // ACTION S2: Please define the members for your travelofferingSearchCriteriasSchema here
  name: z.string().optional(),
  allowedWagonClass: z.string().optional(),
  remoteId: z.string().optional(),
  state: z.string().optional()
} satisfies Partial<Record<keyof TravelOfferingSearchCriteria, ZodTypeAny>>);

export type TravelofferingSearchCriteria = z.infer<
  typeof travelofferingSearchCriteriasSchema
>;
