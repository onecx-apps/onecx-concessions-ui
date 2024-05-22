import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { Action, Store } from '@ngrx/store';
import { PortalMessageService } from '@onecx/portal-integration-angular';
import { filterForNavigatedTo } from '@onecx/portal-integration-angular/ngrx';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { TravelOfferingsInternalBffService } from 'src/app/shared/generated';
import { selectRouteParam } from 'src/app/shared/selectors/router.selectors';
import { TravelofferingDetailsActions } from './traveloffering-details.actions';
import { TravelofferingDetailsComponent } from './traveloffering-details.component';

@Injectable()
export class TravelofferingDetailsEffects {
  constructor(
    private actions$: Actions,
    private travelofferingService: TravelOfferingsInternalBffService,
    private router: Router,
    private store: Store,
    private messageService: PortalMessageService
  ) {}

  loadTravelofferingById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filterForNavigatedTo(this.router, TravelofferingDetailsComponent),
      concatLatestFrom(() => this.store.select(selectRouteParam('id'))),
      switchMap(([, id]) =>
        this.travelofferingService.getTravelOfferingById(id ?? '').pipe(
          map((result) =>
            TravelofferingDetailsActions.travelofferingDetailsReceived({
              details: result,
            })
          ),
          catchError((error) =>
            of(
              TravelofferingDetailsActions.travelofferingDetailsLoadingFailed({
                error,
              })
            )
          )
        )
      )
    );
  });

  errorMessages: { action: Action; key: string }[] = [
    {
      action: TravelofferingDetailsActions.travelofferingDetailsLoadingFailed,
      key: 'TRAVELOFFERING_DETAILS.ERROR_MESSAGES.DETAILS_LOADING_FAILED',
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
