import { TravelconcessionDetailsState } from './pages/travelconcession-details/travelconcession-details.state';
import { TravelconcessionSearchState } from './pages/travelconcession-search/travelconcession-search.state';
export interface TravelconcessionState {
  details: TravelconcessionDetailsState;
  search: TravelconcessionSearchState;
}
