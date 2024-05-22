import { createSelector } from '@ngrx/store';
import {
  RowListGridData,
  DataTableColumn,
} from '@onecx/portal-integration-angular';
import { createChildSelectors } from '@onecx/portal-integration-angular/ngrx';
import { selectQueryParams } from 'src/app/shared/selectors/router.selectors';
import { travelconcessionFeature } from '../../travelconcession.reducers';
import {
  TravelconcessionSearchCriteria,
  travelconcessionSearchCriteriasSchema,
} from './travelconcession-search.parameters';
import { initialState } from './travelconcession-search.reducers';
import { TravelconcessionSearchViewModel } from './travelconcession-search.viewmodel';
import { TravelconcessionSearchConfigState } from './travelconcession-search.state';

export const travelconcessionSearchSelectors = createChildSelectors(
  travelconcessionFeature.selectSearch,
  initialState
);
export const selectSearchCriteria = createSelector(
  selectQueryParams,
  (queryParams): TravelconcessionSearchCriteria => {
    const results =
      travelconcessionSearchCriteriasSchema.safeParse(queryParams);
    if (results.success) {
      return results.data as TravelconcessionSearchCriteria;
    }
    return {};
  }
);

export const selectResults = createSelector(
  travelconcessionSearchSelectors.selectResults,
  (results): RowListGridData[] => {
    return results.map((item) => ({
      id: item.id ?? '',
      imagePath: '',
      ...item,
      // ACTION S7: Here you can create a mapping of the items and their corresponding translation strings
    }));
  }
);

export const selectDisplayedColumns = createSelector(
  travelconcessionSearchSelectors.selectColumns,
  travelconcessionSearchSelectors.selectDisplayedColumns,
  (columns, displayedColumns): DataTableColumn[] => {
    return (
      (displayedColumns
        ?.map((d) => columns.find((c) => c.id === d))
        .filter((d) => d) as DataTableColumn[]) ?? []
    );
  }
);

export const selectTravelconcessionSearchViewModel = createSelector(
  travelconcessionSearchSelectors.selectColumns,
  selectSearchCriteria,
  selectResults,
  travelconcessionSearchSelectors.selectSearchConfigs,
  travelconcessionSearchSelectors.selectSelectedSearchConfig,
  selectDisplayedColumns,
  travelconcessionSearchSelectors.selectViewMode,
  travelconcessionSearchSelectors.selectChartVisible,
  travelconcessionSearchSelectors.selectSearchConfigEnabled,
  (
    columns,
    searchCriteria,
    results,
    searchConfigs,
    selectedSearchConfig,
    displayedColumns,
    viewMode,
    chartVisible,
    searchConfigEnabled
  ): TravelconcessionSearchViewModel => ({
    columns,
    searchCriteria,
    results,
    searchConfigs,
    selectedSearchConfig,
    displayedColumns,
    viewMode,
    chartVisible,
    searchConfigEnabled,
  })
);

export const selectSearchConfigViewState = createSelector(
  travelconcessionSearchSelectors.selectColumns,
  travelconcessionSearchSelectors.selectSearchConfigs,
  travelconcessionSearchSelectors.selectSelectedSearchConfig,
  selectDisplayedColumns,
  travelconcessionSearchSelectors.selectViewMode,
  selectSearchCriteria,
  travelconcessionSearchSelectors.selectSearchConfigEnabled,
  (
    columns,
    searchConfigs,
    selectedSearchConfig,
    displayedColumns,
    viewMode,
    searchCriteria,
    searchConfigEnabled
  ): TravelconcessionSearchConfigState => ({
    columns,
    searchConfigs,
    selectedSearchConfig,
    displayedColumns,
    viewMode,
    searchCriteria,
    searchConfigEnabled,
  })
);
