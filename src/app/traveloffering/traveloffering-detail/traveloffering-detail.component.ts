import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { PortalMessageService } from '@onecx/portal-integration-angular';

import {
  TravelOffering,
  CreateTravelOffering,
  TravelOfferingsInternalBffService,
} from 'src/app/shared/generated';
import { TravelOfferingFormComponent } from '../traveloffering-form/traveloffering-form.component';

@Component({
  selector: 'app-traveloffering-detail',
  templateUrl: './traveloffering-detail.component.html',
  styleUrls: ['./traveloffering-detail.component.scss'],
})
export class TravelOfferingDetailComponent implements OnChanges {
  @Input() public travelOfferingItem: TravelOffering | undefined;
  @Input() public changeMode = 'NEW';
  @Input() public displayDetailDialog = false;
  @Output() public displayDetailDialogChange = new EventEmitter<boolean>();
  @Output() public searchEmitter = new EventEmitter();

  @ViewChild(TravelOfferingFormComponent, { static: false })
  travelOfferingFormComponent!: TravelOfferingFormComponent;

  public itemId: string | undefined;

  constructor(
    private travelOfferingApi: TravelOfferingsInternalBffService,
    private msgService: PortalMessageService
  ) {}

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
    if (this.travelOfferingFormComponent.formGroup.valid) {
      this.travelOfferingApi
        .createNewTravelOffering(
          this.travelOfferingFormComponent.formGroup
            .value as CreateTravelOffering
        )
        .subscribe({
          next: () => {
            this.searchEmitter.emit();
            this.msgService.success({
              summaryKey: 'TRAVELOFFERING_CREATION.CREATION_SUCCESS',
            });
            this.displayDetailDialog = false;
          },
          error: (err: { error: { key: string } }) => {
            err.error.key && err.error.key === 'PERSIST_ENTITY_FAILED'
              ? this.msgService.error({
                  summaryKey: 'TRAVELOFFERING_CREATION.CREATION_FAILED',
                  detailKey: 'TRAVELOFFERING_CREATION.UNIQUE_CONSTRAINT',
                })
              : this.msgService.error({
                  summaryKey: 'TRAVELOFFERING_CREATION.CREATION_FAILED',
                });
          },
        });
    } else {
      this.msgService.error({
        summaryKey: 'TRAVELOFFERING_CREATION.VALIDATION_ERROR',
      });
    }
  }

  private updateTravelOfferingItem(): void {
    if (
      this.travelOfferingFormComponent.formGroup.valid &&
      this.itemId
    ) {
      this.travelOfferingApi
        .updateTravelOffering(
          this.itemId,
          this.travelOfferingFormComponent.formGroup.value
        )
        .subscribe({
          next: () => {
            this.searchEmitter.emit();
            this.msgService.success({
              summaryKey: 'TRAVEL_OFFERING_DETAIL.UPDATE_SUCCESSFUL',
            });
            this.displayDetailDialog = false;
          },
          error: () => {
            this.msgService.error({
              summaryKey: 'TRAVEL_OFFERING_DETAIL.UPDATE_ERROR',
            });
            // console.error(err)
          },
        });
    } else {
      this.msgService.error({
        summaryKey: 'TRAVEL_OFFERING_DETAIL.VALIDATION_ERROR',
      });
    }
  }
}
