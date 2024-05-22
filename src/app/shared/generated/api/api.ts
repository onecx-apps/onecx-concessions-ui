export * from './searchConfig.service';
import { SearchConfigBffService } from './searchConfig.service';
export * from './travelConcessionsInternal.service';
import { TravelConcessionsInternalBffService } from './travelConcessionsInternal.service';
export * from './travelOfferingsInternal.service';
import { TravelOfferingsInternalBffService } from './travelOfferingsInternal.service';
export const APIS = [SearchConfigBffService, TravelConcessionsInternalBffService, TravelOfferingsInternalBffService];
