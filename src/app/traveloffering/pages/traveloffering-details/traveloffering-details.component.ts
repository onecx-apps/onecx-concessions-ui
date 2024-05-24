import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import {
  Action,
  BreadcrumbService,
  ObjectDetailItem,
} from '@onecx/portal-integration-angular';
import { Observable } from 'rxjs';

import { selectTravelofferingDetailsViewModel } from './traveloffering-details.selectors';
import { TravelofferingDetailsViewModel } from './traveloffering-details.viewmodel';

@Component({
  selector: 'app-traveloffering-details',
  templateUrl: './traveloffering-details.component.html',
  styleUrls: ['./traveloffering-details.component.scss'],
})
export class TravelofferingDetailsComponent implements OnInit {
  headerLabels: ObjectDetailItem[] = [];

  headerActions: Action[] = [
    {
      titleKey: 'TRAVELOFFERING_DETAILS.GENERAL.BACK',
      labelKey: 'TRAVELOFFERING_DETAILS.GENERAL.BACK',
      show: 'always',
      actionCallback: () => {
        window.history.back();
      },
    },
  ];

  viewModel$: Observable<TravelofferingDetailsViewModel> = this.store.select(
    selectTravelofferingDetailsViewModel
  );

  constructor(
    private store: Store,
    private breadcrumbService: BreadcrumbService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.setItems([
      {
        titleKey: 'TRAVELOFFERING_DETAILS.BREADCRUMB',
        labelKey: 'TRAVELOFFERING_DETAILS.BREADCRUMB',
        routerLink: '/traveloffering',
      },
    ]);

    this.viewModel$.subscribe((vm) => {
      this.headerLabels = [
        {
          label: this.translateService.instant('GENERAL.TRAVEL_OFFERING.NAME'),
          value: vm.details?.name,
        },
        {
          label: this.translateService.instant('GENERAL.TRAVEL_OFFERING.STATE'),
          value: vm.details?.state,
        },
        {
          label: this.translateService.instant(
            'GENERAL.TRAVEL_OFFERING.ALLOWED_WAGON_CLASS'
          ),
          value: vm.details?.allowedWagonClass,
        },
        {
          label: this.translateService.instant(
            'GENERAL.TRAVEL_OFFERING.REMOTE_ID'
          ),
          value: vm.details?.remoteId,
        },
      ];
    });
  }
}
