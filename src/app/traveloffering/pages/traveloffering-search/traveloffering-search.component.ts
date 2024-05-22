import { RowListGridData } from '@onecx/portal-integration-angular';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  Action,
  BreadcrumbService,
  DataTableColumn,
  ExportDataService,
  PortalDialogService,
  SearchConfigInfo,
} from '@onecx/portal-integration-angular';
import { PrimeIcons } from 'primeng/api';
import { first, map, Observable } from 'rxjs';
import { isValidDate } from '../../../shared/utils/isValidDate.utils';
import { TravelofferingSearchActions } from './traveloffering-search.actions';
import {
  TravelofferingSearchCriteria,
  travelofferingSearchCriteriasSchema,
} from './traveloffering-search.parameters';
import { selectTravelofferingSearchViewModel } from './traveloffering-search.selectors';
import { TravelofferingSearchViewModel } from './traveloffering-search.viewmodel';
import { SimpleTextComponent } from 'src/app/shared/components/simple-text.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-traveloffering-search',
  templateUrl: './traveloffering-search.component.html',
  styleUrls: ['./traveloffering-search.component.scss'],
})
export class TravelofferingSearchComponent implements OnInit {
  viewModel$: Observable<TravelofferingSearchViewModel> = this.store.select(
    selectTravelofferingSearchViewModel
  );

  // ACTION S10: Update header actions
  headerActions$: Observable<Action[]> = this.viewModel$.pipe(
    map((vm) => {
      const actions: Action[] = [
        {
          label: 'create',
          icon: PrimeIcons.PLUS,
          show: 'always',
          actionCallback: () => this.onCreate(),
        },
        {
          labelKey: 'TRAVELOFFERING_SEARCH.HEADER_ACTIONS.EXPORT_ALL',
          icon: PrimeIcons.DOWNLOAD,
          titleKey: 'TRAVELOFFERING_SEARCH.HEADER_ACTIONS.EXPORT_ALL',
          show: 'asOverflow',
          actionCallback: () => this.exportItems(),
        },
        {
          labelKey: vm.chartVisible
            ? 'TRAVELOFFERING_SEARCH.HEADER_ACTIONS.HIDE_CHART'
            : 'TRAVELOFFERING_SEARCH.HEADER_ACTIONS.SHOW_CHART',
          icon: PrimeIcons.EYE,
          titleKey: vm.chartVisible
            ? 'TRAVELOFFERING_SEARCH.HEADER_ACTIONS.HIDE_CHART'
            : 'TRAVELOFFERING_SEARCH.HEADER_ACTIONS.SHOW_CHART',
          show: 'asOverflow',
          actionCallback: () => this.toggleChartVisibility(),
        },
      ];
      if (vm.searchConfigEnabled) {
        if (vm.selectedSearchConfig) {
          actions.push({
            labelKey:
              'TRAVELOFFERING_SEARCH.HEADER_ACTIONS.UPDATE_SEARCH_CONFIG',
            icon: PrimeIcons.FILE_EDIT,
            titleKey:
              'TRAVELOFFERING_SEARCH.HEADER_ACTIONS.UPDATE_SEARCH_CONFIG',
            show: 'asOverflow',
            actionCallback: () => this.updateSearchConfig(),
          });
        } else {
          actions.push({
            labelKey:
              'TRAVELOFFERING_SEARCH.HEADER_ACTIONS.CREATE_SEARCH_CONFIG',
            icon: PrimeIcons.SAVE,
            titleKey:
              'TRAVELOFFERING_SEARCH.HEADER_ACTIONS.CREATE_SEARCH_CONFIG',
            show: 'asOverflow',
            actionCallback: () => this.createSearchConfig(),
          });
        }
      }
      return actions;
    })
  );

  diagramColumnId = 'state';
  diagramColumn$ = this.viewModel$.pipe(
    map(
      (vm) =>
        vm.columns.find((e) => e.id === this.diagramColumnId) as DataTableColumn
    )
  );

  public travelofferingSearchFormGroup: FormGroup = this.formBuilder.group({
    ...(Object.fromEntries(
      travelofferingSearchCriteriasSchema.keyof().options.map((k) => [k, null])
    ) as Record<keyof TravelofferingSearchCriteria, unknown>),
  } satisfies Record<keyof TravelofferingSearchCriteria, unknown>);

  constructor(
    private readonly breadcrumbService: BreadcrumbService,
    private readonly store: Store,
    private readonly formBuilder: FormBuilder,
    @Inject(LOCALE_ID) public readonly locale: string,
    private readonly exportDataService: ExportDataService,
    private portalDialogService: PortalDialogService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.breadcrumbService.setItems([
      {
        titleKey: 'TRAVELOFFERING_SEARCH.BREADCRUMB',
        labelKey: 'TRAVELOFFERING_SEARCH.BREADCRUMB',
        routerLink: '/traveloffering',
      },
    ]);
  }

  search(formValue: FormGroup) {
    const searchCriteria = Object.entries(formValue.getRawValue()).reduce(
      (acc: Partial<TravelofferingSearchCriteria>, [key, value]) => ({
        ...acc,
        [key]: isValidDate(value)
          ? new Date(
              Date.UTC(
                value.getFullYear(),
                value.getMonth(),
                value.getDay(),
                value.getHours(),
                value.getMinutes(),
                value.getSeconds()
              )
            ).toISOString()
          : value || undefined,
      }),
      {}
    );
    this.store.dispatch(
      TravelofferingSearchActions.searchButtonClicked({ searchCriteria })
    );
  }

  details({ id }: RowListGridData) {
    this.store.dispatch(
      TravelofferingSearchActions.detailsButtonClicked({ id })
    );
  }

  delete({ id }: RowListGridData) {
    this.portalDialogService
      .openDialog<unknown>(
        'GENERAL.DELETE.HEADER',
        {
          type: SimpleTextComponent,
          inputs: {
            text: this.translateService.instant('GENERAL.DELETE.CONTENT'),
          },
        },
        {
          key: 'GENERAL.DELETE.CONFIRM',
          icon: PrimeIcons.CHECK,
        },
        {
          key: 'GENERAL.CANCEL',
          icon: PrimeIcons.TIMES,
        }
      )
      .subscribe((stateOnClose) => {
        if (stateOnClose.button == 'primary') {
          this.store.dispatch(
            TravelofferingSearchActions.deletionConfirmed({ id: id as string })
          );
        }
      });
  }

  edit({ id }: RowListGridData) {
    this.store.dispatch(TravelofferingSearchActions.editButtonClicked({ id }));
  }

  resetSearch() {
    this.store.dispatch(TravelofferingSearchActions.resetButtonClicked());
  }

  exportItems() {
    this.viewModel$.pipe(first()).subscribe((data) => {
      this.exportDataService.exportCsv(
        data.displayedColumns,
        data.results,
        'traveloffering.csv'
      );
    });
  }

  searchConfigInfoSelectionChanged(searchConfigInfo: SearchConfigInfo) {
    if (searchConfigInfo) {
      this.store.dispatch(
        TravelofferingSearchActions.selectedSearchConfigInfo({
          searchConfigInfo: searchConfigInfo,
        })
      );
    } else {
      this.store.dispatch(
        TravelofferingSearchActions.searchConfigInfoDeselected()
      );
    }
  }

  viewModeChanged(viewMode: 'basic' | 'advanced') {
    this.store.dispatch(
      TravelofferingSearchActions.viewModeChanged({
        viewMode: viewMode,
      })
    );
  }

  onDisplayedColumnsChange(displayedColumns: DataTableColumn[]) {
    this.store.dispatch(
      TravelofferingSearchActions.displayedColumnsChanged({ displayedColumns })
    );
  }

  toggleChartVisibility() {
    this.store.dispatch(TravelofferingSearchActions.chartVisibilityToggled());
  }

  createSearchConfig(): void {
    this.store.dispatch(
      TravelofferingSearchActions.createSearchConfigClicked()
    );
  }

  updateSearchConfig(): void {
    this.store.dispatch(
      TravelofferingSearchActions.updateSearchConfigClicked()
    );
  }

  public onCreate() {
    this.store.dispatch(TravelofferingSearchActions.createButtonClicked());
  }

  public onDetailClose() {
    this.store.dispatch(TravelofferingSearchActions.detailDialogClose());
  }
}
