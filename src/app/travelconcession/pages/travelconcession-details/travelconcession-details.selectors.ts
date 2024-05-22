import { createSelector } from '@ngrx/store';
import { createChildSelectors } from '@onecx/portal-integration-angular/ngrx';
import { TravelConcession } from '../../../shared/generated';
import { travelconcessionFeature } from '../../travelconcession.reducers';
import { initialState } from './travelconcession-details.reducers';
import { TravelconcessionDetailsViewModel } from './travelconcession-details.viewmodel';

export const travelconcessionDetailsSelectors = createChildSelectors(
  travelconcessionFeature.selectDetails,
  initialState
);

export const selectTravelconcessionDetailsViewModel = createSelector(
  travelconcessionDetailsSelectors.selectDetails,
  (
    details: TravelConcession | undefined
  ): TravelconcessionDetailsViewModel => ({
    details,
  })
);
