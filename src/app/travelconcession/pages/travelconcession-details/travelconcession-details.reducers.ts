import { createReducer, on } from '@ngrx/store';
import { TravelconcessionDetailsActions } from './travelconcession-details.actions';
import { TravelconcessionDetailsState } from './travelconcession-details.state';

export const initialState: TravelconcessionDetailsState = {
  details: undefined,
};

export const travelconcessionDetailsReducer = createReducer(
  initialState,
  on(
    TravelconcessionDetailsActions.travelconcessionDetailsReceived,
    (
      state: TravelconcessionDetailsState,
      { details }
    ): TravelconcessionDetailsState => ({
      ...state,
      details,
    })
  ),
  on(
    TravelconcessionDetailsActions.travelconcessionDetailsLoadingFailed,
    (state: TravelconcessionDetailsState): TravelconcessionDetailsState => ({
      ...state,
      details: undefined,
    })
  )
);
