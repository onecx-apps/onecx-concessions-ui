import { createSelector } from '@ngrx/store';
import {
  DataTableColumn,
  RowListGridData,
} from '@onecx/portal-integration-angular';
import { createChildSelectors } from '@onecx/portal-integration-angular/ngrx';
import { selectQueryParams } from 'src/app/shared/selectors/router.selectors';
import { travelofferingFeature } from '../../traveloffering.reducers';
import {
  TravelofferingSearchCriteria,
  travelofferingSearchCriteriasSchema,
} from './traveloffering-search.parameters';
import { initialState } from './traveloffering-search.reducers';
import { TravelofferingSearchConfigState } from './traveloffering-search.state';
import { TravelofferingSearchViewModel } from './traveloffering-search.viewmodel';

export const travelofferingSearchSelectors = createChildSelectors(
  travelofferingFeature.selectSearch,
  initialState
);
export const selectSearchCriteria = createSelector(
  selectQueryParams,
  (queryParams): TravelofferingSearchCriteria => {
    const results = travelofferingSearchCriteriasSchema.safeParse(queryParams);
    if (results.success) {
      return results.data as TravelofferingSearchCriteria;
    }
    return {};
  }
);

export const selectResults = createSelector(
  travelofferingSearchSelectors.selectResults,
  (results): RowListGridData[] => {
    return results.map((item) => ({
      id: item.id ?? '',
      imagePath: '',
      ...item,
    }));
  }
);

export const selectDisplayedColumns = createSelector(
  travelofferingSearchSelectors.selectColumns,
  travelofferingSearchSelectors.selectDisplayedColumns,
  (columns, displayedColumns): DataTableColumn[] => {
    return (
      (displayedColumns
        ?.map((d) => columns.find((c) => c.id === d))
        .filter((d) => d) as DataTableColumn[]) ?? []
    );
  }
);

export const selectTravelofferingSearchViewModel = createSelector(
  travelofferingSearchSelectors.selectColumns,
  selectSearchCriteria,
  selectResults,
  travelofferingSearchSelectors.selectSearchConfigs,
  travelofferingSearchSelectors.selectSelectedSearchConfig,
  selectDisplayedColumns,
  travelofferingSearchSelectors.selectViewMode,
  travelofferingSearchSelectors.selectChartVisible,
  travelofferingSearchSelectors.selectSearchConfigEnabled,
  travelofferingSearchSelectors.selectChangeMode,
  travelofferingSearchSelectors.selectDisplayDetailDialog,
  travelofferingSearchSelectors.selectDataItem,
  (
    columns,
    searchCriteria,
    results,
    searchConfigs,
    selectedSearchConfig,
    displayedColumns,
    viewMode,
    chartVisible,
    searchConfigEnabled,
    changeMode,
    displayDetailDialog,
    dataItem
  ): TravelofferingSearchViewModel => ({
    columns,
    searchCriteria,
    results,
    searchConfigs,
    selectedSearchConfig,
    displayedColumns,
    viewMode,
    chartVisible,
    searchConfigEnabled,
    changeMode,
    displayDetailDialog,
    dataItem,
  })
);

export const selectSearchConfigViewState = createSelector(
  travelofferingSearchSelectors.selectColumns,
  travelofferingSearchSelectors.selectSearchConfigs,
  travelofferingSearchSelectors.selectSelectedSearchConfig,
  selectDisplayedColumns,
  travelofferingSearchSelectors.selectViewMode,
  selectSearchCriteria,
  travelofferingSearchSelectors.selectSearchConfigEnabled,
  travelofferingSearchSelectors.selectChangeMode,
  travelofferingSearchSelectors.selectDisplayDetailDialog,
  travelofferingSearchSelectors.selectDataItem,
  (
    columns,
    searchConfigs,
    selectedSearchConfig,
    displayedColumns,
    viewMode,
    searchCriteria,
    searchConfigEnabled,
    changeMode,
    displayDetailDialog,
    dataItem
  ): TravelofferingSearchConfigState => ({
    columns,
    searchConfigs,
    selectedSearchConfig,
    displayedColumns,
    viewMode,
    searchCriteria,
    searchConfigEnabled,
    changeMode,
    displayDetailDialog,
    dataItem,
  })
);
