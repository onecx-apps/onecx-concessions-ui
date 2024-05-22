import { travelconcessionDetailsReducer } from './pages/travelconcession-details/travelconcession-details.reducers';
import { travelconcessionSearchReducer } from './pages/travelconcession-search/travelconcession-search.reducers';
import { combineReducers, createFeature } from '@ngrx/store';
import { TravelconcessionState } from './travelconcession.state';

export const travelconcessionFeature = createFeature({
  name: 'travelconcession',
  reducer: combineReducers<TravelconcessionState>({
    details: travelconcessionDetailsReducer,
    search: travelconcessionSearchReducer,
  }),
});
