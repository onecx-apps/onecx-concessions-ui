import { createReducer, on } from '@ngrx/store';
import { TravelconcessionSearchActions } from './travelconcession-search.actions';
import { TravelconcessionSearchState } from './travelconcession-search.state';
import { TravelconcessionSearchCriteria } from './travelconcession-search.parameters';
import { travelconcessionSearchColumns } from './travelconcession-search.columns';

export const initialState: TravelconcessionSearchState = {
  columns: travelconcessionSearchColumns,
  results: [],
  searchConfigs: [],
  selectedSearchConfig: null,
  displayedColumns: null,
  viewMode: 'basic',
  chartVisible: false,
  searchConfigEnabled: false,
  changeMode: 'NEW',
  displayDetailDialog: false,
  dataItem: undefined,
};

export const travelconcessionSearchReducer = createReducer(
  initialState,
  on(
    TravelconcessionSearchActions.resetButtonClicked,
    (state: TravelconcessionSearchState): TravelconcessionSearchState => ({
      ...state,
      results: initialState.results,
      selectedSearchConfig: initialState.selectedSearchConfig,
    })
  ),
  on(
    TravelconcessionSearchActions.travelconcessionSearchResultsReceived,
    (
      state: TravelconcessionSearchState,
      { results }
    ): TravelconcessionSearchState => ({
      ...state,
      results,
    })
  ),
  on(
    TravelconcessionSearchActions.travelconcessionSearchResultsLoadingFailed,
    (state: TravelconcessionSearchState): TravelconcessionSearchState => ({
      ...state,
      results: [],
    })
  ),
  on(
    TravelconcessionSearchActions.searchConfigInfosReceived,
    (
      state: TravelconcessionSearchState,
      { searchConfigInfos }
    ): TravelconcessionSearchState => ({
      ...state,
      searchConfigs: searchConfigInfos,
      searchConfigEnabled: true,
      selectedSearchConfig: null,
    })
  ),
  on(
    TravelconcessionSearchActions.searchConfigReceived,
    (
      state: TravelconcessionSearchState,
      { searchConfig }
    ): TravelconcessionSearchState => ({
      ...state,
      selectedSearchConfig: searchConfig,
    })
  ),
  on(
    TravelconcessionSearchActions.searchConfigInfoDeselected,
    (state: TravelconcessionSearchState): TravelconcessionSearchState => ({
      ...state,
      selectedSearchConfig: null,
    })
  ),
  on(
    TravelconcessionSearchActions.searchConfigReceived,
    (
      state: TravelconcessionSearchState,
      { searchConfig }
    ): TravelconcessionSearchState => ({
      ...state,
      viewMode: searchConfig?.isAdvanced ? 'advanced' : 'basic',
      displayedColumns: searchConfig.columns.length
        ? searchConfig.columns
        : state.displayedColumns,
    })
  ),
  on(
    TravelconcessionSearchActions.searchConfigCreatedSuccessfully,
    (
      state: TravelconcessionSearchState,
      { searchConfigInfos }
    ): TravelconcessionSearchState => ({
      ...state,
      searchConfigs: searchConfigInfos,
    })
  ),
  on(
    TravelconcessionSearchActions.searchConfigInfoDeselected,
    (state: TravelconcessionSearchState): TravelconcessionSearchState => ({
      ...state,
      results: initialState.results,
      selectedSearchConfig: initialState.selectedSearchConfig,
    })
  ),
  on(
    TravelconcessionSearchActions.searchButtonClicked,
    (
      state: TravelconcessionSearchState,
      { searchCriteria }
    ): TravelconcessionSearchState => ({
      ...state,
      selectedSearchConfig:
        state.selectedSearchConfig &&
        Object.keys(searchCriteria).length ==
          Object.keys(state.selectedSearchConfig?.values ?? {}).length &&
        Object.keys(searchCriteria).every(
          (k) =>
            state.selectedSearchConfig?.values[k] ===
            searchCriteria[k as keyof TravelconcessionSearchCriteria]
        )
          ? state.selectedSearchConfig
          : null,
    })
  ),
  on(
    TravelconcessionSearchActions.chartVisibilityRehydrated,
    (
      state: TravelconcessionSearchState,
      { visible }
    ): TravelconcessionSearchState => ({
      ...state,
      chartVisible: visible,
    })
  ),
  on(
    TravelconcessionSearchActions.chartVisibilityToggled,
    (state: TravelconcessionSearchState): TravelconcessionSearchState => ({
      ...state,
      chartVisible: !state.chartVisible,
    })
  ),
  on(
    TravelconcessionSearchActions.viewModeChanged,
    (
      state: TravelconcessionSearchState,
      { viewMode }
    ): TravelconcessionSearchState => ({
      ...state,
      viewMode: viewMode,
    })
  ),
  on(
    TravelconcessionSearchActions.createButtonClicked,
    (state: TravelconcessionSearchState): TravelconcessionSearchState => ({
      ...state,
      changeMode: 'NEW',
      displayDetailDialog: true,
      dataItem: {},
    })
  ),
  on(
    TravelconcessionSearchActions.detailDialogClose,
    (state: TravelconcessionSearchState): TravelconcessionSearchState => ({
      ...state,
      changeMode: 'NEW',
      displayDetailDialog: false,
      dataItem: undefined,
    })
  ),
  on(
    TravelconcessionSearchActions.dataItemSet,
    (
      state: TravelconcessionSearchState,
      { dataItem }
    ): TravelconcessionSearchState => ({
      ...state,
      changeMode: 'EDIT',
      displayDetailDialog: true,
      dataItem: dataItem,
    })
  )
);
