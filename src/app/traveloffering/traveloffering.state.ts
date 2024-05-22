import { TravelofferingDetailsState } from './pages/traveloffering-details/traveloffering-details.state';
import { TravelofferingSearchState } from './pages/traveloffering-search/traveloffering-search.state';
export interface TravelofferingState {
  details: TravelofferingDetailsState;

  search: TravelofferingSearchState;
}
