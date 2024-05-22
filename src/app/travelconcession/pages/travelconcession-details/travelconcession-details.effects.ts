import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { Action, Store } from '@ngrx/store';
import { PortalMessageService } from '@onecx/portal-integration-angular';
import { filterForNavigatedTo } from '@onecx/portal-integration-angular/ngrx';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { selectRouteParam } from 'src/app/shared/selectors/router.selectors';
import { TravelConcessionsInternalBffService } from '../../../shared/generated';
import { TravelconcessionDetailsActions } from './travelconcession-details.actions';
import { TravelconcessionDetailsComponent } from './travelconcession-details.component';

@Injectable()
export class TravelconcessionDetailsEffects {
  constructor(
    private actions$: Actions,
    private travelconcessionService: TravelConcessionsInternalBffService,
    private router: Router,
    private store: Store,
    private messageService: PortalMessageService
  ) {}

  loadTravelconcessionById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filterForNavigatedTo(this.router, TravelconcessionDetailsComponent),
      concatLatestFrom(() => this.store.select(selectRouteParam('id'))),
      switchMap(([, id]) =>
        this.travelconcessionService.getTravelConcessionById(id ?? '').pipe(
          map((result) =>
            TravelconcessionDetailsActions.travelconcessionDetailsReceived({
              details: result,
            })
          ),
          catchError((error) =>
            of(
              TravelconcessionDetailsActions.travelconcessionDetailsLoadingFailed(
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

  errorMessages: { action: Action; key: string }[] = [
    {
      action:
        TravelconcessionDetailsActions.travelconcessionDetailsLoadingFailed,
      key: 'TRAVELCONCESSION_DETAILS.ERROR_MESSAGES.DETAILS_LOADING_FAILED',
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
