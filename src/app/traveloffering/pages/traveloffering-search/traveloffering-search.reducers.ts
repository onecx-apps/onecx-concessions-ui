import { createReducer, on } from '@ngrx/store';
import { TravelofferingSearchActions } from './traveloffering-search.actions';
import { travelofferingSearchColumns } from './traveloffering-search.columns';
import { TravelofferingSearchCriteria } from './traveloffering-search.parameters';
import { TravelofferingSearchState } from './traveloffering-search.state';

export const initialState: TravelofferingSearchState = {
  columns: travelofferingSearchColumns,
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
  totalNumberOfResults: 0
};

export const travelofferingSearchReducer = createReducer(
  initialState,
  on(
    TravelofferingSearchActions.resetButtonClicked,
    (state: TravelofferingSearchState): TravelofferingSearchState => ({
      ...state,
      results: initialState.results,
      selectedSearchConfig: initialState.selectedSearchConfig,
    })
  ),
  on(
    TravelofferingSearchActions.travelofferingSearchResultsReceived,
    (
      state: TravelofferingSearchState,
      { results, totalNumberOfResults }
    ): TravelofferingSearchState => ({
      ...state,
      results,
      totalNumberOfResults,
    })
  ),
  on(
    TravelofferingSearchActions.travelofferingSearchResultsLoadingFailed,
    (state: TravelofferingSearchState): TravelofferingSearchState => ({
      ...state,
      results: [],
    })
  ),
  on(
    TravelofferingSearchActions.searchConfigInfosReceived,
    (
      state: TravelofferingSearchState,
      { searchConfigInfos }
    ): TravelofferingSearchState => ({
      ...state,
      searchConfigs: searchConfigInfos,
      searchConfigEnabled: true,
      selectedSearchConfig: null,
    })
  ),
  on(
    TravelofferingSearchActions.searchConfigReceived,
    (
      state: TravelofferingSearchState,
      { searchConfig }
    ): TravelofferingSearchState => ({
      ...state,
      selectedSearchConfig: searchConfig,
    })
  ),
  on(
    TravelofferingSearchActions.searchConfigInfoDeselected,
    (state: TravelofferingSearchState): TravelofferingSearchState => ({
      ...state,
      selectedSearchConfig: null,
    })
  ),
  on(
    TravelofferingSearchActions.searchConfigReceived,
    (
      state: TravelofferingSearchState,
      { searchConfig }
    ): TravelofferingSearchState => ({
      ...state,
      viewMode: searchConfig?.isAdvanced ? 'advanced' : 'basic',
      displayedColumns: searchConfig.columns.length
        ? searchConfig.columns
        : state.displayedColumns,
    })
  ),
  on(
    TravelofferingSearchActions.searchConfigCreatedSuccessfully,
    (
      state: TravelofferingSearchState,
      { searchConfigInfos }
    ): TravelofferingSearchState => ({
      ...state,
      searchConfigs: searchConfigInfos,
    })
  ),
  on(
    TravelofferingSearchActions.searchConfigInfoDeselected,
    (state: TravelofferingSearchState): TravelofferingSearchState => ({
      ...state,
      results: initialState.results,
      selectedSearchConfig: initialState.selectedSearchConfig,
    })
  ),
  on(
    TravelofferingSearchActions.searchButtonClicked,
    (
      state: TravelofferingSearchState,
      { searchCriteria }
    ): TravelofferingSearchState => ({
      ...state,
      selectedSearchConfig:
        state.selectedSearchConfig &&
        Object.keys(searchCriteria).length ==
          Object.keys(state.selectedSearchConfig?.values ?? {}).length &&
        Object.keys(searchCriteria).every(
          (k) =>
            state.selectedSearchConfig?.values[k] ===
            searchCriteria[k as keyof TravelofferingSearchCriteria]
        )
          ? state.selectedSearchConfig
          : null,
    })
  ),
  on(
    TravelofferingSearchActions.chartVisibilityRehydrated,
    (
      state: TravelofferingSearchState,
      { visible }
    ): TravelofferingSearchState => ({
      ...state,
      chartVisible: visible,
    })
  ),
  on(
    TravelofferingSearchActions.chartVisibilityToggled,
    (state: TravelofferingSearchState): TravelofferingSearchState => ({
      ...state,
      chartVisible: !state.chartVisible,
    })
  ),
  on(
    TravelofferingSearchActions.viewModeChanged,
    (
      state: TravelofferingSearchState,
      { viewMode }
    ): TravelofferingSearchState => ({
      ...state,
      viewMode: viewMode,
    })
  ),
  on(
    TravelofferingSearchActions.createButtonClicked,
    (state: TravelofferingSearchState): TravelofferingSearchState => ({
      ...state,
      changeMode: 'NEW',
      displayDetailDialog: true,
      dataItem: {},
    })
  ),
  on(
    TravelofferingSearchActions.detailDialogClose,
    (state: TravelofferingSearchState): TravelofferingSearchState => ({
      ...state,
      changeMode: 'NEW',
      displayDetailDialog: false,
      dataItem: undefined,
    })
  ),
  on(
    TravelofferingSearchActions.dataItemSet,
    (
      state: TravelofferingSearchState,
      { dataItem }
    ): TravelofferingSearchState => ({
      ...state,
      changeMode: 'EDIT',
      displayDetailDialog: true,
      dataItem: dataItem,
    })
  )
);
