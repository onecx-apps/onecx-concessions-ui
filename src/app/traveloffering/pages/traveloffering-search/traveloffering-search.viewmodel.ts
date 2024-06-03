import {
  DataTableColumn,
  RowListGridData,
} from '@onecx/portal-integration-angular';

import { TravelofferingSearchCriteria } from './traveloffering-search.parameters';
import { SearchConfigInfo } from 'src/app/shared/generated/model/searchConfigInfo';
import { SearchConfig } from 'src/app/shared/generated/model/searchConfig';
import { TravelOffering } from 'src/app/shared/generated';

export interface TravelofferingSearchViewModel {
  columns: DataTableColumn[];
  searchCriteria: TravelofferingSearchCriteria;
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
  dataItem: TravelOffering | undefined;
}
