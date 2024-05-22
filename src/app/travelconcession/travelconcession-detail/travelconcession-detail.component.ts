import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PortalMessageService } from '@onecx/portal-integration-angular';

import {
  CreateTravelConcession,
  TravelConcession,
  TravelConcessionsInternalBffService,
  TravelOffering,
  TravelOfferingsInternalBffService,
  UpdateTravelConcession,
} from 'src/app/shared/generated';
import { TravelConcessionFormComponent } from '../travelconcession-form/travelconcession-form.component';

@Component({
  selector: 'app-travelconcession-detail',
  templateUrl: './travelconcession-detail.component.html',
  styleUrls: ['./travelconcession-detail.component.scss'],
})
export class TravelConcessionDetailComponent implements OnChanges, OnInit {
  @Input() public travelOfferingItem: TravelConcession | undefined;
  @Input() public changeMode = 'NEW';
  @Input() public displayDetailDialog = false;
  @Output() public displayDetailDialogChange = new EventEmitter<boolean>();
  @Output() public searchEmitter = new EventEmitter();

  @ViewChild(TravelConcessionFormComponent, { static: false })
  dataFormComponent!: TravelConcessionFormComponent;

  public itemId: string | undefined;
  public availableOfferings: TravelOffering[] = [];

  constructor(
    private dataApi: TravelConcessionsInternalBffService,
    private offeringApi: TravelOfferingsInternalBffService,
    private msgService: PortalMessageService
  ) {}

  ngOnInit() {
    this.offeringApi.searchTravelOfferings({}).subscribe((result) => {
      if (result.stream) this.availableOfferings = result.stream;
    });
  }

  ngOnChanges() {
    if (this.changeMode === 'EDIT') {
      this.itemId = this.travelOfferingItem?.id;
    }
    if (this.changeMode === 'NEW') {
      this.itemId = undefined;
    }
  }

  public onDialogHide() {
    this.displayDetailDialogChange.emit(false);
  }

  /****************************************************************************
   *  SAVING
   */
  public onSave() {
    this.changeMode === 'NEW'
      ? this.createTravelOfferingItem()
      : this.updateTravelOfferingItem();
  }

  private createTravelOfferingItem() {
    if (this.dataFormComponent.formGroup.valid) {
      const concession = this.dataFormComponent.formGroup
        .value as CreateTravelConcession;
      this.dataApi
        .createNewTravelConcession({
          ...concession,
          offeringId: this.dataFormComponent.formGroup.value.offering.id,
        })
        .subscribe({
          next: () => {
            this.searchEmitter.emit();
            this.msgService.success({
              summaryKey: 'TRAVELCONCESSION_CREATION.CREATION_SUCCESS',
            });
            this.displayDetailDialog = false;
          },
          error: (err: { error: { key: string } }) => {
            err.error.key && err.error.key === 'PERSIST_ENTITY_FAILED'
              ? this.msgService.error({
                  summaryKey: 'TRAVELCONCESSION_CREATION.CREATION_FAILED',
                  detailKey: 'TRAVELCONCESSION_CREATION.UNIQUE_CONSTRAINT',
                })
              : this.msgService.error({
                  summaryKey: 'TRAVELCONCESSION_CREATION.CREATION_FAILED',
                });
          },
        });
    } else {
      this.msgService.error({
        summaryKey: 'TRAVELCONCESSION_CREATION.VALIDATION_ERROR',
      });
    }
  }

  private updateTravelOfferingItem(): void {
    if (this.dataFormComponent.formGroup.valid && this.itemId) {
      const concession = this.dataFormComponent.formGroup
        .value as UpdateTravelConcession;
      this.dataApi
        .updateTravelConcession(this.itemId, {
          ...concession,
          offeringId: this.dataFormComponent.formGroup.value.offering.id,
        })
        .subscribe({
          next: () => {
            this.searchEmitter.emit();
            this.msgService.success({
              summaryKey: 'TRAVELCONCESSION_DETAIL.UPDATE_SUCCESSFUL',
            });
            this.displayDetailDialog = false;
          },
          error: () => {
            this.msgService.error({
              summaryKey: 'TRAVELCONCESSION_DETAIL.UPDATE_ERROR',
            });
            // console.error(err)
          },
        });
    } else {
      this.msgService.error({
        summaryKey: 'TRAVELCONCESSION_DETAIL.VALIDATION_ERROR',
      });
    }
  }
}
