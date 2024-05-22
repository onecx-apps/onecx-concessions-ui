import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { DataTableColumn } from '@onecx/portal-integration-angular';
import {
  SearchConfig,
  SearchConfigInfo,
  TravelConcession,
} from '../../../shared/generated';
import { TravelconcessionSearchCriteria } from './travelconcession-search.parameters';

export const TravelconcessionSearchActions = createActionGroup({
  source: 'TravelconcessionSearch',
  events: {
    'Details button clicked': props<{
      id: number | string;
    }>(),

    'Search button clicked': props<{
      searchCriteria: TravelconcessionSearchCriteria;
    }>(),
    'Reset button clicked': emptyProps(),
    'Create button clicked': emptyProps(),
    'Detail Dialog close': emptyProps(),
    'Edit button clicked': props<{
      id: number | string;
    }>(),
    'Data Item set': props<{
      dataItem: TravelConcession;
    }>(),
    'Deletion confirmed': props<{
      id: string;
    }>(),
    'travelconcession search results received': props<{
      results: TravelConcession[];
      totalNumberOfResults: number;
    }>(),
    'travelconcession search results loading failed': props<{
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
