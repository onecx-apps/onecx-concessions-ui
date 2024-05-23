import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Action,
  BreadcrumbService,
  ObjectDetailItem,
} from '@onecx/portal-integration-angular';
import { Observable } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { selectTravelconcessionDetailsViewModel } from './travelconcession-details.selectors';
import { TravelconcessionDetailsViewModel } from './travelconcession-details.viewmodel';

@Component({
  selector: 'app-travelconcession-details',
  templateUrl: './travelconcession-details.component.html',
  styleUrls: ['./travelconcession-details.component.scss'],
})
export class TravelconcessionDetailsComponent implements OnInit {
  headerLabels: ObjectDetailItem[] = [
    //ACTION D1: Add header values here
  ];

  headerActions: Action[] = [
    {
      titleKey: 'TRAVELCONCESSION_DETAILS.GENERAL.BACK',
      labelKey: 'TRAVELCONCESSION_DETAILS.GENERAL.BACK',
      show: 'always',
      actionCallback: () => {
        window.history.back();
      },
    },
  ];

  viewModel$: Observable<TravelconcessionDetailsViewModel> = this.store.select(
    selectTravelconcessionDetailsViewModel
  );

  constructor(
    private store: Store,
    private breadcrumbService: BreadcrumbService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.setItems([
      {
        titleKey: 'TRAVELCONCESSION_DETAILS.BREADCRUMB',
        labelKey: 'TRAVELCONCESSION_DETAILS.BREADCRUMB',
        routerLink: '/travelconcession',
      },
    ]);

    this.viewModel$.subscribe((vm) => {
      this.headerLabels = [
        {
          label: this.translateService.instant(
            'GENERAL.TRAVEL_CONCESSION.OFFERING'
          ),
          value: vm.details?.offering?.name,
        },
        {
          label: this.translateService.instant(
            'GENERAL.TRAVEL_CONCESSION.STATE'
          ),
          value: vm.details?.state,
        },
        {
          label: this.translateService.instant(
            'GENERAL.TRAVEL_CONCESSION.PRINCIPAL_ROLE'
          ),
          value: vm.details?.principalRole,
        },
        {
          label: this.translateService.instant(
            'GENERAL.TRAVEL_CONCESSION.CUSTOMER_RELATION_TO_PRINCIPAL'
          ),
          value: vm.details?.customerRelationToPrincipal,
        },
      ];
    });
  }
}
