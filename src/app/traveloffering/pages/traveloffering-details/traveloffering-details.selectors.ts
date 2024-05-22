import { createSelector } from '@ngrx/store';
import { createChildSelectors } from '@onecx/portal-integration-angular/ngrx';
import { travelofferingFeature } from '../../traveloffering.reducers';
import { initialState } from './traveloffering-details.reducers';
import { TravelofferingDetailsViewModel } from './traveloffering-details.viewmodel';
import { TravelOffering } from '../../../shared/generated';

export const travelofferingDetailsSelectors = createChildSelectors(
  travelofferingFeature.selectDetails,
  initialState
);

export const selectTravelofferingDetailsViewModel = createSelector(
  travelofferingDetailsSelectors.selectDetails,
  (details: TravelOffering | undefined): TravelofferingDetailsViewModel => ({
    details,
  })
);
