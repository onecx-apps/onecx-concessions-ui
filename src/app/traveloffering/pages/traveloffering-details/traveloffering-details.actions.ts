import { createActionGroup, props } from '@ngrx/store';
import { TravelOffering } from '../../../shared/generated';

export const TravelofferingDetailsActions = createActionGroup({
  source: 'TravelofferingDetails',
  events: {
    'traveloffering details received': props<{
      details: TravelOffering;
    }>(),
    'traveloffering details loading failed': props<{ error: string | null }>(),
  },
});
