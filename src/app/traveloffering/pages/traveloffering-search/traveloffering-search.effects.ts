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
import { selectUrl } from 'src/app/shared/selectors/router.selectors';

import { TravelOfferingsInternalBffService } from 'src/app/shared/generated';
import { SearchConfigBffService } from 'src/app/shared/generated/api/searchConfig.service';
import { CreateSearchConfigRequest } from 'src/app/shared/generated/model/createSearchConfigRequest';
import { TravelofferingSearchActions } from './traveloffering-search.actions';
import { TravelofferingSearchComponent } from './traveloffering-search.component';
import { travelofferingSearchCriteriasSchema } from './traveloffering-search.parameters';
import {
  selectSearchConfigViewState,
  selectSearchCriteria,
  travelofferingSearchSelectors,
} from './traveloffering-search.selectors';

@Injectable()
export class TravelofferingSearchEffects {
  constructor(
    private actions$: Actions,
    @SkipSelf() private route: ActivatedRoute,
    private travelofferingService: TravelOfferingsInternalBffService,
    private searchConfigService: SearchConfigBffService,
    private router: Router,
    private store: Store,
    private messageService: PortalMessageService,
    private portalDialogService: PortalDialogService
  ) {}

  pageName = 'traveloffering';

  createSearchConfig$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TravelofferingSearchActions.createSearchConfigClicked),
      mergeMap((action) => {
        return this.portalDialogService.openDialog(
          'TRAVELOFFERING_SEARCH.HEADER_ACTIONS.CREATE_SEARCH_CONFIG',
          CreateOrEditSearchConfigDialogComponent,
          'TRAVELOFFERING_SEARCH.HEADER_ACTIONS.DIALOG_CONFIRM',
          'TRAVELOFFERING_SEARCH.HEADER_ACTIONS.DIALOG_CANCEL'
        );
      }),
      concatLatestFrom(() => this.store.select(selectSearchConfigViewState)),
      switchMap(([dialogResult, viewState]) => {
        if (dialogResult.button === 'secondary') {
          return of(
            TravelofferingSearchActions.searchConfigCreationCancelled()
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
                  (viewState?.searchCriteria as Record<string, any>)[
                    k
                  ].toString(),
                ])
              )
            : {},
        };
        return this.searchConfigService.createSearchConfig(request).pipe(
          map(({ configs }) => {
            return TravelofferingSearchActions.searchConfigCreatedSuccessfully({
              searchConfigInfos: configs,
            });
          })
        );
      }),

      catchError((error) =>
        of(
          TravelofferingSearchActions.searchConfigCreationFailed({
            error,
          })
        )
      )
    );
  });

  updateSearchConfig$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TravelofferingSearchActions.updateSearchConfigClicked),
      concatLatestFrom(() =>
        this.store.select(
          travelofferingSearchSelectors.selectSelectedSearchConfig
        )
      ),
      mergeMap(([, selectedSearchConfig]) => {
        return this.portalDialogService.openDialog<CreateOrEditSearchDialogContent>(
          'CONSTRUCTION_TASK_SEARCH.HEADER_ACTIONS.UPDATE_SEARCH_CONFIG',
          {
            type: CreateOrEditSearchConfigDialogComponent,
            inputs: {
              searchConfigName: selectedSearchConfig?.name,
              saveInputValues:
                Object.keys(selectedSearchConfig?.values ?? {}).length > 0,
              saveColumns: (selectedSearchConfig?.columns ?? []).length > 0,
            },
          },
          'TRAVELOFFERING_SEARCH.HEADER_ACTIONS.DIALOG_CONFIRM',
          'TRAVELOFFERING_SEARCH.HEADER_ACTIONS.DIALOG_CANCEL'
        );
      }),
      concatLatestFrom(() => this.store.select(selectSearchConfigViewState)),
      switchMap(([dialogResult, viewState]) => {
        if (dialogResult.button === 'secondary') {
          return of(TravelofferingSearchActions.searchConfigUpdateCancelled());
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
                  (viewState?.searchCriteria as Record<string, any>)[
                    k
                  ].toString(),
                ])
              )
            : {},
        };
        return this.searchConfigService.createSearchConfig(request).pipe(
          map(({ configs }) => {
            return TravelofferingSearchActions.searchConfigUpdatedSuccessfully({
              searchConfigInfos: configs,
            });
          })
        );
      }),

      catchError((error) =>
        of(
          TravelofferingSearchActions.searchConfigUpdateFailed({
            error,
          })
        )
      )
    );
  });

  searchConfigDeselected$ = createQueryParamsEffect(
    this.actions$,
    TravelofferingSearchActions.searchConfigInfoDeselected,
    this.router,
    this.route,
    () => ({})
  );

  resetButtonClicked$ = createQueryParamsEffect(
    this.actions$,
    TravelofferingSearchActions.resetButtonClicked,
    this.router,
    this.route,
    () => ({})
  );

  searchButtonClicked$ = createQueryParamsEffect(
    this.actions$,
    TravelofferingSearchActions.searchButtonClicked,
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
    TravelofferingSearchActions.searchConfigReceived,
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
        ofType(TravelofferingSearchActions.detailsButtonClicked),
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
      ofType(TravelofferingSearchActions.editButtonClicked),
      concatLatestFrom(() =>
        this.store.select(travelofferingSearchSelectors.selectResults)
      ),
      map(([action, results]) => {
        const dataItem = results.filter((item) => item.id == action.id)[0];
        return TravelofferingSearchActions.dataItemSet({
          dataItem,
        });
      })
    );
  });

  deletionConfirmed$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TravelofferingSearchActions.deletionConfirmed),
      concatLatestFrom(() => this.store.select(selectSearchCriteria)),
      switchMap(([action, searchCriteria]) =>
        this.travelofferingService.deleteTravelOffering(action.id).pipe(
          map(() =>
            TravelofferingSearchActions.searchButtonClicked({
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
      filterForNavigatedTo(this.router, TravelofferingSearchComponent),
      filterOutQueryParamsHaveNotChanged(
        this.router,
        travelofferingSearchCriteriasSchema,
        true
      ),
      concatLatestFrom(() => this.store.select(selectSearchCriteria)),
      switchMap(([, searchCriteria]) =>
        this.travelofferingService.searchTravelOfferings(searchCriteria).pipe(
          map(({ stream, totalElements }) =>
            TravelofferingSearchActions.travelofferingSearchResultsReceived({
              results: stream ?? [],
              totalNumberOfResults: totalElements ?? 0,
            })
          ),
          catchError((error) =>
            of(
              TravelofferingSearchActions.travelofferingSearchResultsLoadingFailed(
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
      ofType(TravelofferingSearchActions.selectedSearchConfigInfo),
      switchMap(({ searchConfigInfo }) =>
        this.searchConfigService.getSearchConfig(searchConfigInfo.id).pipe(
          map(({ config }) =>
            TravelofferingSearchActions.searchConfigReceived({
              searchConfig: config,
            })
          ),
          catchError((error) =>
            of(
              TravelofferingSearchActions.searchConfigsLoadingFailed({
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
      filterForNavigatedTo(this.router, TravelofferingSearchComponent),
      filterOutOnlyQueryParamsChanged(this.router),
      switchMap(() =>
        this.searchConfigService
          .getSearchConfigInfos('construction-task-search')
          .pipe(
            map(({ configs }) =>
              TravelofferingSearchActions.searchConfigInfosReceived({
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
      filterForNavigatedTo(this.router, TravelofferingSearchComponent),
      filterOutOnlyQueryParamsChanged(this.router),
      map(() =>
        TravelofferingSearchActions.chartVisibilityRehydrated({
          visible:
            localStorage.getItem('travelofferingChartVisibility') === 'true',
        })
      )
    );
  });

  saveChartVisibility$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TravelofferingSearchActions.chartVisibilityToggled),
        concatLatestFrom(() =>
          this.store.select(travelofferingSearchSelectors.selectChartVisible)
        ),
        tap(([, chartVisible]) => {
          localStorage.setItem(
            'travelofferingChartVisibility',
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
        TravelofferingSearchActions.travelofferingSearchResultsLoadingFailed,
      key: 'TRAVELOFFERING_SEARCH.ERROR_MESSAGES.SEARCH_RESULTS_LOADING_FAILED',
    },
    {
      action: TravelofferingSearchActions.searchConfigCreationFailed,
      key: 'TRAVELOFFERING_SEARCH.ERROR_MESSAGES.SEARCH_CONFIG_CREATION_FAILED',
    },
    {
      action: TravelofferingSearchActions.searchConfigUpdateFailed,
      key: 'TRAVELOFFERING_SEARCH.ERROR_MESSAGES.SEARCH_CONFIG_UPDATE_FAILED',
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
