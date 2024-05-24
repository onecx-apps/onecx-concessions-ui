import { createActionGroup, props } from '@ngrx/store';
import { TravelConcession } from '../../../shared/generated';

export const TravelconcessionDetailsActions = createActionGroup({
  source: 'TravelconcessionDetails',
  events: {
    'travelconcession details received': props<{
      details: TravelConcession;
    }>(),
    'travelconcession details loading failed': props<{
      error: string | null;
    }>(),
  },
});
