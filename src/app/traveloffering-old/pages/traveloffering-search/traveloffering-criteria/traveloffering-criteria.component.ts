import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import {
  Action,
  PortalMessageService,
} from '@onecx/portal-integration-angular';
import {
  TravelOfferingSearchCriteria,
  TravelOfferingsInternalBffService,
} from 'src/app/shared/generated';

export interface TravelOfferingCriteriaForm {
  itemId: FormControl<string | null>;
  appId: FormControl<string | null>;
}

@Component({
  selector: 'app-traveloffering-criteria',
  templateUrl: './traveloffering-criteria.component.html',
})
export class TravelOfferingCriteriaComponent {
  @Input() public actions: Action[] = [];
  @Input() public appsChanged = false;
  @Output() public criteriaEmitter =
    new EventEmitter<TravelOfferingSearchCriteria>();

  // private translatedData!: Record<string, string>
  public displayDetailDialog = false;
  public travelofferingCriteriaGroup!: FormGroup<TravelOfferingCriteriaForm>;
  public applicationsIds: string[] = [];
  public applicationsIdsFiltered: string[] = [];

  constructor(
    private travelofferingInteralAPIService: TravelOfferingsInternalBffService,
    private msgService: PortalMessageService
  ) {
    this.travelofferingCriteriaGroup =
      new FormGroup<TravelOfferingCriteriaForm>({
        itemId: new FormControl<string | null>(null),
        appId: new FormControl<string | null>(null),
      });
  }

  public filterApplications(event: { query: string }) {
    const query = event.query.toLowerCase();
    this.applicationsIdsFiltered = this.applicationsIds?.filter((app) =>
      app.toLowerCase().includes(query)
    );
  }

  public resetCriteria() {
    this.travelofferingCriteriaGroup.reset();
  }

  public submitCriteria() {
    if (this.travelofferingCriteriaGroup.valid) {
      this.criteriaEmitter.emit(
        this.travelofferingCriteriaGroup.value as TravelOfferingSearchCriteria
      );
    } else {
      this.msgService.error({
        summaryKey: 'HELP_SEARCH.MSG_SEARCH_VALIDATION',
      });
    }
  }
}
