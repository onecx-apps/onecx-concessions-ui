import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Column } from '@onecx/portal-integration-angular';
import { CreateTravelConcession } from 'src/app/shared/generated';

export interface DataForm {
  principalRole: FormControl<string | null>;
  customerRelationToPrincipal: FormControl<string | null>;
  state: FormControl<string | null>;
}

@Component({
  selector: 'app-travelconcession-form',
  templateUrl: './travelconcession-form.component.html',
})
export class TravelConcessionFormComponent implements OnChanges {
  @Input() dataItem: CreateTravelConcession | undefined;
  @Input() changeMode = 'NEW';

  public formGroup: FormGroup;
  public columns: Column[] = [
    { field: 'principalRole', header: 'PRINCIPAL_ROLE' },
    {
      field: 'customerRelationToPrincipal',
      header: 'CUSTOMER_RELATION_TO_PRINCIPAL',
    },
    { field: 'state', header: 'STATE' },
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
    });
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
