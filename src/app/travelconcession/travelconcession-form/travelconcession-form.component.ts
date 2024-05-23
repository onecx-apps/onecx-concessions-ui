import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Column } from '@onecx/portal-integration-angular';
import {
  CreateTravelConcession,
  TravelOffering,
} from 'src/app/shared/generated';

export interface DataForm {
  principalRole: FormControl<string | null>;
  customerRelationToPrincipal: FormControl<string | null>;
  state: FormControl<string | null>;
  offering: FormControl<TravelOffering | null>;
}
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-travelconcession-form',
  templateUrl: './travelconcession-form.component.html',
})
export class TravelConcessionFormComponent implements OnChanges {
  @Input() dataItem: CreateTravelConcession | undefined;
  @Input() changeMode = 'NEW';
  @Input() availableOfferings: TravelOffering[] = [];

  public filteredOfferings: TravelOffering[] = [];
  public formGroup: FormGroup;
  public columns: Column[] = [
    { field: 'principalRole', header: 'PRINCIPAL_ROLE' },
    {
      field: 'customerRelationToPrincipal',
      header: 'CUSTOMER_RELATION_TO_PRINCIPAL',
    },
    { field: 'state', header: 'STATE' },
    { field: 'offering', header: 'OFFERING' },
  ];

  public dropdownOptions = [
    {
      label: 'INITIALIZED',
      value: 'INITIALIZED',
    },
    {
      label: 'ACTIVE',
      value: 'ACTIVE',
    },
    {
      label: 'INACTIVE',
      value: 'INACTIVE',
    },
  ];

  constructor() {
    this.formGroup = new FormGroup<DataForm>({
      principalRole: new FormControl(null, [Validators.maxLength(255)]),
      customerRelationToPrincipal: new FormControl(null, [
        Validators.maxLength(255),
      ]),
      state: new FormControl(null, [Validators.maxLength(255)]),
      offering: new FormControl<TravelOffering>({}),
    });
  }

  filterOffering(event: AutoCompleteCompleteEvent) {
    const filtered: TravelOffering[] = [];
    const query = event.query;

    for (let i = 0; i < this.availableOfferings.length; i++) {
      const availableOffering = this.availableOfferings[i];
      if (
        availableOffering.name &&
        availableOffering.name.toLowerCase().indexOf(query.toLowerCase()) == 0
      ) {
        filtered.push(availableOffering);
      }
    }

    this.filteredOfferings = filtered;
  }

  ngOnChanges(): void {
    if (this.dataItem) {
      this.formGroup.patchValue({
        ...this.dataItem,
      });
    } else {
      this.formGroup.reset();
      this.formGroup.patchValue({
        state: 'INITIALIZED',
      });
    }
  }
}
