import {
  DataTableColumn,
  SearchConfigInfo,
} from '@onecx/portal-integration-angular';

import { TravelofferingSearchCriteria } from './traveloffering-search.parameters';
import {
  TravelOffering,
  TravelOfferingPageResult,
} from 'src/app/shared/generated';
import { SearchConfig } from 'src/app/shared/generated/model/searchConfig';

export interface TravelofferingSearchState {
  columns: DataTableColumn[];
  results: TravelOffering[];
  searchConfigs: SearchConfigInfo[];
  selectedSearchConfig: SearchConfig | null;
  displayedColumns: string[] | null;
  viewMode: 'basic' | 'advanced';
  chartVisible: boolean;
  searchConfigEnabled: boolean;
  changeMode: 'NEW' | 'EDIT';
  displayDetailDialog: boolean;
  dataItem: TravelOffering | undefined;
}

export interface TravelofferingSearchConfigState {
  columns: DataTableColumn[];
  searchConfigs: SearchConfigInfo[];
  selectedSearchConfig: SearchConfig | null;
  displayedColumns: DataTableColumn[];
  viewMode: 'basic' | 'advanced';
  searchCriteria: TravelofferingSearchCriteria;
  searchConfigEnabled: boolean;
  changeMode: 'NEW' | 'EDIT';
  displayDetailDialog: boolean;
  dataItem: TravelOffering | undefined;
}
