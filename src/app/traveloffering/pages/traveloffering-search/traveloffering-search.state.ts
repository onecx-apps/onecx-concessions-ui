import {
  DataTableColumn,
  SearchConfigInfo,
} from '@onecx/portal-integration-angular';

import { TravelOffering } from 'src/app/shared/generated';
import { SearchConfig } from 'src/app/shared/generated/model/searchConfig';
import { TravelofferingSearchCriteria } from './traveloffering-search.parameters';

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
  totalNumberOfResults: number;
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
  totalNumberOfResults: number;
}
