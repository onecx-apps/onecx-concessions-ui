import { createFeatureSelector } from '@ngrx/store';
import { travelofferingFeature } from './traveloffering.reducers';
import { TravelofferingState } from './traveloffering.state';

export const selectTravelofferingFeature =
  createFeatureSelector<TravelofferingState>(travelofferingFeature.name);
