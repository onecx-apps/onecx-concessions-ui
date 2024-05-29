import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { Column } from '@onecx/portal-integration-angular';
import { CreateTravelOffering } from 'src/app/shared/generated';

export interface TravelOfferingForm {
  name: FormControl<string | null>;
  allowedWagonClass: FormControl<string | null>;
  remoteId: FormControl<string | null>;
  state: FormControl<string | null>;
  group: FormControl<string | null>;
}

@Component({
  selector: 'app-traveloffering-form',
  templateUrl: './traveloffering-form.component.html',
})
export class TravelOfferingFormComponent implements OnChanges, OnInit {
  @Input() dataItem: CreateTravelOffering | undefined;
  @Input() changeMode = 'NEW';

  public formGroup: FormGroup;
  public columns: Column[] = [
    { field: 'name', header: 'NAME' },
    { field: 'allowedWagonClass', header: 'ALLOWED_WAGON_CLASS' },
    { field: 'group', header: 'GROUP' },
    { field: 'remoteId', header: 'REMOTE_ID' },
    { field: 'state', header: 'STATE' },
  ];

  private groupKeys = ['DAILY_M_FAR', 'REGIO_M_50', 'PUPIL_M', 'DB_JOB_M'];

  public groupOptions = this.groupKeys.map((key) => ({
    label: key,
    value: key,
  }));

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

  constructor(private translateService: TranslateService) {
    this.formGroup = new FormGroup<TravelOfferingForm>({
      name: new FormControl(null, [Validators.maxLength(255)]),
      allowedWagonClass: new FormControl(null, [Validators.maxLength(255)]),
      remoteId: new FormControl(null, [Validators.maxLength(255)]),
      state: new FormControl(null, [Validators.maxLength(255)]),
      group: new FormControl(null, [Validators.maxLength(255)]),
    });
  }

  ngOnInit(): void {
    this.groupOptions = [];
    this.groupKeys.forEach((key) => {
      this.groupOptions.push({
        label: this.translateService.instant(
          'GENERAL.TRAVEL_OFFERING.GROUP_OPTIONS.' + key
        ),
        value: key,
      });
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
        group: this.groupKeys[0],
      });
    }
  }
}
