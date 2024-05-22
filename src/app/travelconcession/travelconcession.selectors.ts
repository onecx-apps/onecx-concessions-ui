import { createFeatureSelector } from '@ngrx/store';
import { travelconcessionFeature } from './travelconcession.reducers';
import { TravelconcessionState } from './travelconcession.state';

export const selectTravelconcessionFeature =
  createFeatureSelector<TravelconcessionState>(travelconcessionFeature.name);
