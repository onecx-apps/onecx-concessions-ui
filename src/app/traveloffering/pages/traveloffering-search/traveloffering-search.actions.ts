import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  DataTableColumn,
  SearchConfigInfo,
} from '@onecx/portal-integration-angular';
import { TravelOffering } from 'src/app/shared/generated';
import { SearchConfig } from 'src/app/shared/generated/model/searchConfig';
import { TravelofferingSearchCriteria } from './traveloffering-search.parameters';

export const TravelofferingSearchActions = createActionGroup({
  source: 'TravelofferingSearch',
  events: {
    'Details button clicked': props<{
      id: number | string;
    }>(),
    'Create button clicked': emptyProps(),
    'Detail Dialog close': emptyProps(),
    'Edit button clicked': props<{
      id: number | string;
    }>(),
    'Deletion confirmed': props<{
      id: string;
    }>(),
    'Data Item set': props<{
      dataItem: TravelOffering;
    }>(),
    'Search button clicked': props<{
      searchCriteria: TravelofferingSearchCriteria;
    }>(),
    'Reset button clicked': emptyProps(),

    'traveloffering search results received': props<{
      results: TravelOffering[];
      totalNumberOfResults: number;
    }>(),
    'traveloffering search results loading failed': props<{
      error: string | null;
    }>(),
    'Search config received': props<{
      searchConfig: SearchConfig;
    }>(),
    'Search configs loading failed': props<{
      error: string | null;
    }>(),
    'Search config selected': props<{
      searchConfig: SearchConfig | null;
    }>(),
    'Create search config clicked': emptyProps(),
    'Search config created successfully': props<{
      searchConfigInfos: SearchConfigInfo[];
    }>(),
    'Search config creation failed': props<{
      error: string | null;
    }>(),
    'Search config creation cancelled': emptyProps(),
    'Update search config clicked': emptyProps(),
    'Search config updated successfully': props<{
      searchConfigInfos: SearchConfigInfo[];
    }>(),
    'Search config update cancelled': emptyProps(),
    'Search config update failed': props<{
      error: string | null;
    }>(),

    'Search config infos received': props<{
      searchConfigInfos: SearchConfigInfo[];
    }>(),
    'Selected search config info': props<{
      searchConfigInfo: SearchConfigInfo;
    }>(),
    'Search config info deselected': emptyProps(),

    'Displayed columns changed': props<{
      displayedColumns: DataTableColumn[];
    }>(),
    'Chart visibility rehydrated': props<{
      visible: boolean;
    }>(),
    'Chart visibility toggled': emptyProps(),
    'View mode changed': props<{
      viewMode: 'basic' | 'advanced';
    }>(),
  },
});
