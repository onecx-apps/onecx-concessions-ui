import { DataTableColumn } from '@onecx/portal-integration-angular';
import {
  SearchConfig,
  SearchConfigInfo,
  TravelConcession,
} from 'src/app/shared/generated';
import { TravelconcessionSearchCriteria } from './travelconcession-search.parameters';

export interface TravelconcessionSearchState {
  columns: DataTableColumn[];
  results: TravelConcession[];
  searchConfigs: SearchConfigInfo[];
  selectedSearchConfig: SearchConfig | null;
  displayedColumns: string[] | null;
  viewMode: 'basic' | 'advanced';
  chartVisible: boolean;
  searchConfigEnabled: boolean;
}

export interface TravelconcessionSearchConfigState {
  columns: DataTableColumn[];
  searchConfigs: SearchConfigInfo[];
  selectedSearchConfig: SearchConfig | null;
  displayedColumns: DataTableColumn[];
  viewMode: 'basic' | 'advanced';
  searchCriteria: TravelconcessionSearchCriteria;
  searchConfigEnabled: boolean;
}
