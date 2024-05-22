import { createReducer, on } from '@ngrx/store';
import { TravelofferingDetailsActions } from './traveloffering-details.actions';
import { TravelofferingDetailsState } from './traveloffering-details.state';

export const initialState: TravelofferingDetailsState = {
  details: undefined,
};

export const travelofferingDetailsReducer = createReducer(
  initialState,
  on(
    TravelofferingDetailsActions.travelofferingDetailsReceived,
    (
      state: TravelofferingDetailsState,
      { details }
    ): TravelofferingDetailsState => ({
      ...state,
      details,
    })
  ),
  on(
    TravelofferingDetailsActions.travelofferingDetailsLoadingFailed,
    (state: TravelofferingDetailsState): TravelofferingDetailsState => ({
      ...state,
      details: undefined,
    })
  )
);
