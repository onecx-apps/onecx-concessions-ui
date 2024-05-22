import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Column } from '@onecx/portal-integration-angular';
import { CreateTravelOffering } from 'src/app/shared/generated';

export interface TravelOfferingForm {
  name: FormControl<string | null>;
  allowedWagonClass: FormControl<string | null>;
  remoteId: FormControl<string | null>;
  state: FormControl<string | null>;
}

@Component({
  selector: 'app-traveloffering-form',
  templateUrl: './traveloffering-form.component.html',
})
export class TravelOfferingFormComponent implements OnChanges {
  @Input() dataItem: CreateTravelOffering | undefined;
  @Input() changeMode = 'NEW';

  public formGroup: FormGroup;
  public columns: Column[] = [
    { field: 'name', header: 'NAME' },
    { field: 'allowedWagonClass', header: 'ALLOWED_WAGON_CLASS' },
    { field: 'remoteId', header: 'REMOTE_ID' },
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
    this.formGroup = new FormGroup<TravelOfferingForm>({
      name: new FormControl(null, [Validators.maxLength(255)]),
      allowedWagonClass: new FormControl(null, [Validators.maxLength(255)]),
      remoteId: new FormControl(null, [Validators.maxLength(255)]),
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
        state: 'INITIALIZED'
      })
    }
  }
}
