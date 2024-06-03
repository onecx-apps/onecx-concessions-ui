import {
  SearchConfig,
  SearchConfigInfo,
  TravelConcession,
} from 'src/app/shared/generated';
import { TravelconcessionSearchCriteria } from './travelconcession-search.parameters';
import {
  RowListGridData,
  DataTableColumn,
} from '@onecx/portal-integration-angular';

export interface TravelconcessionSearchViewModel {
  columns: DataTableColumn[];
  searchCriteria: TravelconcessionSearchCriteria;
  results: RowListGridData[];
  totalNumberOfResults: number;
  searchConfigs: SearchConfigInfo[];
  selectedSearchConfig: SearchConfig | null;
  displayedColumns: DataTableColumn[];
  viewMode: 'basic' | 'advanced';
  chartVisible: boolean;
  searchConfigEnabled: boolean;
  changeMode: 'NEW' | 'EDIT';
  displayDetailDialog: boolean;
  dataItem: TravelConcession | undefined;
}
