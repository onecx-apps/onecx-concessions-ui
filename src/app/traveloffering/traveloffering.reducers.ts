import { travelofferingDetailsReducer } from './pages/traveloffering-details/traveloffering-details.reducers';
import { combineReducers, createFeature } from '@ngrx/store';
import { travelofferingSearchReducer } from './pages/traveloffering-search/traveloffering-search.reducers';
import { TravelofferingState } from './traveloffering.state';

export const travelofferingFeature = createFeature({
  name: 'traveloffering',
  reducer: combineReducers<TravelofferingState>({
    details: travelofferingDetailsReducer,
    search: travelofferingSearchReducer,
  }),
});
