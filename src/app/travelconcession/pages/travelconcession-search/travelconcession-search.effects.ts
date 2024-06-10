import { selectUrl } from 'src/app/shared/selectors/router.selectors';
import { Injectable, SkipSelf } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { Action, Store } from '@ngrx/store';
import {
  CreateOrEditSearchConfigDialogComponent,
  CreateOrEditSearchDialogContent,
  PortalDialogService,
  PortalMessageService,
} from '@onecx/portal-integration-angular';
import {
  createQueryParamsEffect,
  filterForNavigatedTo,
  filterOutOnlyQueryParamsChanged,
  filterOutQueryParamsHaveNotChanged,
} from '@onecx/portal-integration-angular/ngrx';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import {
  CreateSearchConfigRequest,
  SearchConfigBffService,
  TravelConcessionsInternalBffService,
} from '../../../shared/generated';
import { TravelconcessionSearchActions } from './travelconcession-search.actions';
import { TravelconcessionSearchComponent } from './travelconcession-search.component';
import { travelconcessionSearchCriteriasSchema } from './travelconcession-search.parameters';
import {
  selectSearchConfigViewState,
  selectSearchCriteria,
  travelconcessionSearchSelectors,
} from './travelconcession-search.selectors';

@Injectable()
export class TravelconcessionSearchEffects {
  constructor(
    private actions$: Actions,
    @SkipSelf() private route: ActivatedRoute,
    private travelconcessionService: TravelConcessionsInternalBffService,
    private searchConfigService: SearchConfigBffService,
    private router: Router,
    private store: Store,
    private messageService: PortalMessageService,
    private portalDialogService: PortalDialogService
  ) {}

  pageName = 'travelconcession';

  createSearchConfig$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TravelconcessionSearchActions.createSearchConfigClicked),
      mergeMap(() => {
        return this.portalDialogService.openDialog(
          'TRAVELCONCESSION_SEARCH.HEADER_ACTIONS.CREATE_SEARCH_CONFIG',
          CreateOrEditSearchConfigDialogComponent,
          'TRAVELCONCESSION_SEARCH.HEADER_ACTIONS.DIALOG_CONFIRM',
          'TRAVELCONCESSION_SEARCH.HEADER_ACTIONS.DIALOG_CANCEL'
        );
      }),
      concatLatestFrom(() => this.store.select(selectSearchConfigViewState)),
      switchMap(([dialogResult, viewState]) => {
        if (dialogResult.button === 'secondary') {
          return of(
            TravelconcessionSearchActions.searchConfigCreationCancelled()
          );
        }
        const request: CreateSearchConfigRequest = {
          page: this.pageName ?? '',
          fieldListVersion: 0,
          name: dialogResult.result?.searchConfigName ?? '',
          isReadonly: false,
          isAdvanced: viewState.viewMode === 'advanced' ?? false,
          columns: dialogResult.result?.saveColumns
            ? viewState.columns.map((c) => c.id)
            : [],
          values: dialogResult.result?.saveInputValues
            ? Object.fromEntries(
                Object.keys(viewState?.searchCriteria ?? {}).map((k) => [
                  k,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (viewState?.searchCriteria as Record<string, any>)[
                    k
                  ].toString(),
                ])
              )
            : {},
        };
        return this.searchConfigService.createSearchConfig(request).pipe(
          map(({ configs }) => {
            return TravelconcessionSearchActions.searchConfigCreatedSuccessfully(
              {
                searchConfigInfos: configs,
              }
            );
          })
        );
      }),

      catchError((error) =>
        of(
          TravelconcessionSearchActions.searchConfigCreationFailed({
            error,
          })
        )
      )
    );
  });

  updateSearchConfig$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TravelconcessionSearchActions.updateSearchConfigClicked),
      concatLatestFrom(() =>
        this.store.select(
          travelconcessionSearchSelectors.selectSelectedSearchConfig
        )
      ),
      mergeMap(([, selectedSearchConfig]) => {
        return this.portalDialogService.openDialog<CreateOrEditSearchDialogContent>(
          'CONCESSIONS_SEARCH.HEADER_ACTIONS.UPDATE_SEARCH_CONFIG',
          {
            type: CreateOrEditSearchConfigDialogComponent,
            inputs: {
              searchConfigName: selectedSearchConfig?.name,
              saveInputValues:
                Object.keys(selectedSearchConfig?.values ?? {}).length > 0,
              saveColumns: (selectedSearchConfig?.columns ?? []).length > 0,
            },
          },
          'TRAVELCONCESSION_SEARCH.HEADER_ACTIONS.DIALOG_CONFIRM',
          'TRAVELCONCESSION_SEARCH.HEADER_ACTIONS.DIALOG_CANCEL'
        );
      }),
      concatLatestFrom(() => this.store.select(selectSearchConfigViewState)),
      switchMap(([dialogResult, viewState]) => {
        if (dialogResult.button === 'secondary') {
          return of(
            TravelconcessionSearchActions.searchConfigUpdateCancelled()
          );
        }
        const request: CreateSearchConfigRequest = {
          page: this.pageName ?? '',
          name: dialogResult.result?.searchConfigName ?? '',
          fieldListVersion: 0,
          isReadonly: false,
          isAdvanced: viewState.viewMode === 'advanced',
          columns: dialogResult.result?.saveColumns
            ? viewState.columns.map((c) => c.id)
            : [],
          values: dialogResult.result?.saveInputValues
            ? Object.fromEntries(
                Object.keys(viewState?.searchCriteria ?? {}).map((k) => [
                  k,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (viewState?.searchCriteria as Record<string, any>)[
                    k
                  ].toString(),
                ])
              )
            : {},
        };
        return this.searchConfigService.createSearchConfig(request).pipe(
          map(({ configs }) => {
            return TravelconcessionSearchActions.searchConfigUpdatedSuccessfully(
              {
                searchConfigInfos: configs,
              }
            );
          })
        );
      }),

      catchError((error) =>
        of(
          TravelconcessionSearchActions.searchConfigUpdateFailed({
            error,
          })
        )
      )
    );
  });

  searchConfigDeselected$ = createQueryParamsEffect(
    this.actions$,
    TravelconcessionSearchActions.searchConfigInfoDeselected,
    this.router,
    this.route,
    () => ({})
  );

  resetButtonClicked$ = createQueryParamsEffect(
    this.actions$,
    TravelconcessionSearchActions.resetButtonClicked,
    this.router,
    this.route,
    () => ({})
  );

  searchButtonClicked$ = createQueryParamsEffect(
    this.actions$,
    TravelconcessionSearchActions.searchButtonClicked,
    this.router,
    this.route,
    (state, action) => ({
      ...state,
      ...action.searchCriteria,
      //TODO: Move to docs to explain how to only put the date part in the URL in case you have date and not datetime
      //exampleDate: action.searchCriteria.exampleDate?.slice(0, 10)
    })
  );

  searchConfigReceived$ = createQueryParamsEffect(
    this.actions$,
    TravelconcessionSearchActions.searchConfigReceived,
    this.router,
    this.route,
    (state, action) => ({
      ...state,
      ...(action.searchConfig.values ?? {}),
    })
  );

  detailsButtonClicked$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TravelconcessionSearchActions.detailsButtonClicked),
        concatLatestFrom(() => this.store.select(selectUrl)),
        tap(([action, currentUrl]) => {
          const urlTree = this.router.parseUrl(currentUrl);
          urlTree.queryParams = {};
          urlTree.fragment = null;
          this.router.navigate([urlTree.toString(), 'details', action.id]);
        })
      );
    },
    { dispatch: false }
  );

  editButtonClicked$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TravelconcessionSearchActions.editButtonClicked),
      concatLatestFrom(() =>
        this.store.select(travelconcessionSearchSelectors.selectResults)
      ),
      map(([action, results]) => {
        const dataItem = results.filter((item) => item.id == action.id)[0];        
        return TravelconcessionSearchActions.dataItemSet({
          dataItem,
        });
      })
    );
  });

  deletionConfirmed$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TravelconcessionSearchActions.deletionConfirmed),
      concatLatestFrom(() => this.store.select(selectSearchCriteria)),
      switchMap(([action, searchCriteria]) =>
        this.travelconcessionService.deleteTravelConcession(action.id).pipe(
          map(() =>
            TravelconcessionSearchActions.searchButtonClicked({
              searchCriteria,
            })
          )
        )
      )
    );
  });

  searchByUrl$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filterForNavigatedTo(this.router, TravelconcessionSearchComponent),
      filterOutQueryParamsHaveNotChanged(
        this.router,
        travelconcessionSearchCriteriasSchema,
        true
      ),
      concatLatestFrom(() => this.store.select(selectSearchCriteria)),
      switchMap(([, searchCriteria]) =>
        this.travelconcessionService
          .searchTravelConcession({
            ...searchCriteria,
            // Temporary workaround until pagination can be implemented
            pageSize: 2000,
          })
          .pipe(
            map(({ stream, totalElements }) =>
              TravelconcessionSearchActions.travelconcessionSearchResultsReceived(
                {
                  results: stream ?? [],
                  totalNumberOfResults: totalElements ?? 0,
                }
              )
            ),
            catchError((error) =>
              of(
                TravelconcessionSearchActions.travelconcessionSearchResultsLoadingFailed(
                  {
                    error,
                  }
                )
              )
            )
          )
      )
    );
  });

  loadSearchConfig$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TravelconcessionSearchActions.selectedSearchConfigInfo),
      switchMap(({ searchConfigInfo }) =>
        this.searchConfigService.getSearchConfig(searchConfigInfo.id).pipe(
          map(({ config }) =>
            TravelconcessionSearchActions.searchConfigReceived({
              searchConfig: config,
            })
          ),
          catchError((error) =>
            of(
              TravelconcessionSearchActions.searchConfigsLoadingFailed({
                error,
              })
            )
          )
        )
      )
    );
  });

  loadSearchConfigInfos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filterForNavigatedTo(this.router, TravelconcessionSearchComponent),
      filterOutOnlyQueryParamsChanged(this.router),
      switchMap(() =>
        this.searchConfigService
          .getSearchConfigInfos('concessions-search')
          .pipe(
            map(({ configs }) =>
              TravelconcessionSearchActions.searchConfigInfosReceived({
                searchConfigInfos: configs,
              })
            )
          )
      )
    );
  });

  rehydrateChartVisibility$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filterForNavigatedTo(this.router, TravelconcessionSearchComponent),
      filterOutOnlyQueryParamsChanged(this.router),
      map(() =>
        TravelconcessionSearchActions.chartVisibilityRehydrated({
          visible:
            localStorage.getItem('travelconcessionChartVisibility') === 'true',
        })
      )
    );
  });

  saveChartVisibility$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TravelconcessionSearchActions.chartVisibilityToggled),
        concatLatestFrom(() =>
          this.store.select(travelconcessionSearchSelectors.selectChartVisible)
        ),
        tap(([, chartVisible]) => {
          localStorage.setItem(
            'travelconcessionChartVisibility',
            String(chartVisible)
          );
        })
      );
    },
    { dispatch: false }
  );

  errorMessages: { action: Action; key: string }[] = [
    {
      action:
        TravelconcessionSearchActions.travelconcessionSearchResultsLoadingFailed,
      key: 'TRAVELCONCESSION_SEARCH.ERROR_MESSAGES.SEARCH_RESULTS_LOADING_FAILED',
    },
    {
      action: TravelconcessionSearchActions.searchConfigCreationFailed,
      key: 'TRAVELCONCESSION_SEARCH.ERROR_MESSAGES.SEARCH_CONFIG_CREATION_FAILED',
    },
    {
      action: TravelconcessionSearchActions.searchConfigUpdateFailed,
      key: 'TRAVELCONCESSION_SEARCH.ERROR_MESSAGES.SEARCH_CONFIG_UPDATE_FAILED',
    },
  ];

  displayError$ = createEffect(
    () => {
      return this.actions$.pipe(
        tap((action) => {
          const e = this.errorMessages.find(
            (e) => e.action.type === action.type
          );
          if (e) {
            this.messageService.error({ summaryKey: e.key });
          }
        })
      );
    },
    { dispatch: false }
  );
}
