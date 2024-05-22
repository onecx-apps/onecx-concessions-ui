import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { finalize, Observable } from 'rxjs';
import { Table } from 'primeng/table';

import {
  Action,
  Column,
  PortalMessageService,
} from '@onecx/portal-integration-angular';
import {
  TravelOffering,
  TravelOfferingSearchCriteria,
  TravelOfferingsInternalBffService,
} from 'src/app/shared/generated';

type ExtendedColumn = Column & { css?: string; limit?: boolean };
type ChangeMode = 'VIEW' | 'NEW' | 'EDIT';

@Component({
  selector: 'app-traveloffering-search',
  templateUrl: './traveloffering-search.component.html',
  styleUrls: ['./traveloffering-search.component.scss'],
})
export class TravelOfferingSearchComponent implements OnInit {
  @ViewChild('table', { static: false }) table!: Table;

  public changeMode: ChangeMode = 'NEW';
  public actions: Action[] = [
    {
      label: 'Create New',
      actionCallback: () => {
        this.onCreate();
      },
    },
  ];
  public travelOfferingItem: TravelOffering | undefined;
  public results: TravelOffering[] = [];
  public criteria: TravelOfferingSearchCriteria = {};
  public travelofferingSearchCriteria!: TravelOfferingSearchCriteria;
  public searchInProgress = false;
  public loadingResults = false;
  public displayDeleteDialog = false;
  public displayDetailDialog = false;
  public appsChanged = false;
  public rowsPerPage = 10;
  public rowsPerPageOptions = [10, 20, 50];
  public items$!: Observable<any>;

  public filteredColumns: Column[] = [];
  public columns: ExtendedColumn[] = [
    {
      field: 'appId',
      header: 'APPLICATION_ID',
      active: true,
      translationPrefix: 'HELP_ITEM',
      css: 'hidden sm:table-cell',
    },
    {
      field: 'itemId',
      header: 'HELP_ITEM_ID',
      active: true,
      translationPrefix: 'HELP_ITEM',
    },
    {
      field: 'context',
      header: 'CONTEXT',
      active: true,
      translationPrefix: 'HELP_ITEM',
      css: 'hidden xl:table-cell',
    },
    {
      field: 'baseUrl',
      header: 'BASE_URL',
      active: true,
      translationPrefix: 'HELP_ITEM',
      css: 'hidden lg:table-cell',
    },
    {
      field: 'resourceUrl',
      header: 'RESOURCE_URL',
      active: true,
      translationPrefix: 'HELP_ITEM',
      css: 'hidden xl:table-cell',
    },
  ];

  constructor(
    private travelOfferingInternalAPIService: TravelOfferingsInternalBffService,
    private translate: TranslateService,
    private msgService: PortalMessageService
  ) {}

  ngOnInit(): void {
    this.search(this.criteria);
    this.filteredColumns = this.columns.filter((a) => {
      return a.active === true;
    });

    this.translate
      .get(['ACTIONS.CREATE.LABEL', 'ACTIONS.CREATE.HELP_ITEM.TOOLTIP'])
      .subscribe((data) => {
        this.actions.push({
          label: data['ACTIONS.CREATE.LABEL'],
          title: data['ACTIONS.CREATE.HELP_ITEM.TOOLTIP'],
          actionCallback: () => this.onCreate(),
          icon: 'pi pi-plus',
          show: 'always',
          permission: 'HELP#EDIT',
        });
      });
  }

  /****************************************************************************
   *  SEARCHING
   *    - initial, without any criteria => to be checked again with stakeholder
   *    - user initiated search with criteria
   *    - re-searching (with current criteria) after changes in detail dialog
   */
  public search(
    criteria: TravelOfferingSearchCriteria,
    reuseCriteria = false
  ): void {
    const criteriaSearchParams: any = {
      travelofferingSearchCriteria: criteria,
    };

    if (!reuseCriteria) {
      if (criteriaSearchParams.travelofferingSearchCriteria?.appId === '')
        criteriaSearchParams.travelofferingSearchCriteria.appId = undefined;
      if (criteriaSearchParams.travelofferingSearchCriteria?.itemId === '')
        criteriaSearchParams.travelofferingSearchCriteria.itemId = undefined;
      this.criteria = criteriaSearchParams;
    }
    this.searchInProgress = true;
    this.travelOfferingInternalAPIService
      .searchTravelOfferings(this.criteria)
      .pipe(finalize(() => (this.searchInProgress = false)))
      .subscribe({
        next: (data) => {
          if (data.stream !== undefined) {
            this.results = data.stream;
          }
          this.results?.sort(this.sortTravelOfferingItemByDefault);
          if (data.stream?.length === 0) {
            this.msgService.info({
              summaryKey: 'GENERAL.SEARCH.MSG_NO_RESULTS',
            });
          }

          this.appsChanged = false;
        },
        error: () =>
          this.msgService.error({
            summaryKey: 'GENERAL.SEARCH.MSG_SEARCH_FAILED',
          }),
      });
  }
  public onSearch() {
    this.changeMode = 'NEW';
    this.appsChanged = true;
    this.search(this.criteria, true);
  }

  // default sorting: 1. state, 2.name
  private sortTravelOfferingItemByDefault(
    a: TravelOffering,
    b: TravelOffering
  ): number {
    return (
      (a.state ? a.state.toUpperCase() : '').localeCompare(
        b.state ? b.state.toUpperCase() : ''
      ) ||
      (a.name ? a.name.toUpperCase() : '').localeCompare(
        b.name ? b.name.toUpperCase() : ''
      )
    );
  }

  public onColumnsChange(activeIds: string[]) {
    this.filteredColumns = activeIds.map((id) =>
      this.columns.find((col) => col.field === id)
    ) as Column[];
  }
  public onFilterChange(event: string): void {
    this.table.filterGlobal(event, 'contains');
  }

  /****************************************************************************
   *  CHANGES
   */
  public onCreate() {
    this.changeMode = 'NEW';
    this.appsChanged = false;
    this.travelOfferingItem = undefined;
    this.displayDetailDialog = true;
  }
  public onDetail(
    ev: MouseEvent,
    item: TravelOffering,
    mode: ChangeMode
  ): void {
    ev.stopPropagation();
    this.changeMode = mode;
    this.appsChanged = false;
    this.travelOfferingItem = item;
    this.displayDetailDialog = true;
  }
  public onCopy(ev: MouseEvent, item: TravelOffering) {
    ev.stopPropagation();
    this.changeMode = 'NEW';
    this.appsChanged = false;
    this.travelOfferingItem = item;
    this.displayDetailDialog = true;
  }
  public onDelete(ev: MouseEvent, item: TravelOffering): void {
    ev.stopPropagation();
    this.travelOfferingItem = item;
    this.appsChanged = false;
    this.displayDeleteDialog = true;
  }
  public onDeleteConfirmation(): void {
    if (
      this.travelOfferingItem?.id &&
      typeof this.travelOfferingItem.name === 'string'
    ) {
      this.travelOfferingInternalAPIService
        .deleteTravelOffering(this.travelOfferingItem?.id)
        .subscribe({
          next: () => {
            this.displayDeleteDialog = false;
            this.results = this.results?.filter(
              (a) => a.id !== this.travelOfferingItem?.id
            );
            this.travelOfferingItem = undefined;
            this.appsChanged = true;
            this.msgService.success({
              summaryKey: 'ACTIONS.DELETE.MESSAGE.HELP_ITEM_OK',
            });
          },
          error: () =>
            this.msgService.error({
              summaryKey: 'ACTIONS.DELETE.MESSAGE.HELP_ITEM_NOK',
            }),
        });
    }
  }
}
