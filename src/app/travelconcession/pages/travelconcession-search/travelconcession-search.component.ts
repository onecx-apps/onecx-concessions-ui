import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  Action,
  BreadcrumbService,
  DataTableColumn,
  ExportDataService,
  PortalDialogService,
  RowListGridData,
} from '@onecx/portal-integration-angular';
import { PrimeIcons } from 'primeng/api';
import { Observable, first, map } from 'rxjs';
import { SearchConfigInfo } from 'src/app/shared/generated';
import { isValidDate } from '../../../shared/utils/isValidDate.utils';
import { TravelconcessionSearchActions } from './travelconcession-search.actions';
import {
  TravelconcessionSearchCriteria,
  travelconcessionSearchCriteriasSchema,
} from './travelconcession-search.parameters';
import { selectTravelconcessionSearchViewModel } from './travelconcession-search.selectors';
import { TravelconcessionSearchViewModel } from './travelconcession-search.viewmodel';
import { SimpleTextComponent } from 'src/app/shared/components/simple-text.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-travelconcession-search',
  templateUrl: './travelconcession-search.component.html',
  styleUrls: ['./travelconcession-search.component.scss'],
})
export class TravelconcessionSearchComponent implements OnInit {
  viewModel$: Observable<TravelconcessionSearchViewModel> = this.store.select(
    selectTravelconcessionSearchViewModel
  );

  public dropdownStateOptions = [
    undefined,
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

  headerActions$: Observable<Action[]> = this.viewModel$.pipe(
    map((vm) => {
      const actions: Action[] = [
        {
          labelKey: 'GENERAL.CREATE',
          icon: PrimeIcons.PLUS,
          show: 'always',
          actionCallback: () => this.onCreate(),
        },
        {
          labelKey: 'TRAVELCONCESSION_SEARCH.HEADER_ACTIONS.EXPORT_ALL',
          icon: PrimeIcons.DOWNLOAD,
          titleKey: 'TRAVELCONCESSION_SEARCH.HEADER_ACTIONS.EXPORT_ALL',
          show: 'asOverflow',
          actionCallback: () => this.exportItems(),
        },
        {
          labelKey: vm.chartVisible
            ? 'TRAVELCONCESSION_SEARCH.HEADER_ACTIONS.HIDE_CHART'
            : 'TRAVELCONCESSION_SEARCH.HEADER_ACTIONS.SHOW_CHART',
          icon: PrimeIcons.EYE,
          titleKey: vm.chartVisible
            ? 'TRAVELCONCESSION_SEARCH.HEADER_ACTIONS.HIDE_CHART'
            : 'TRAVELCONCESSION_SEARCH.HEADER_ACTIONS.SHOW_CHART',
          show: 'asOverflow',
          actionCallback: () => this.toggleChartVisibility(),
        },
      ];
      if (vm.searchConfigEnabled) {
        if (vm.selectedSearchConfig) {
          actions.push({
            labelKey:
              'TRAVELCONCESSION_SEARCH.HEADER_ACTIONS.UPDATE_SEARCH_CONFIG',
            icon: PrimeIcons.FILE_EDIT,
            titleKey:
              'TRAVELCONCESSION_SEARCH.HEADER_ACTIONS.UPDATE_SEARCH_CONFIG',
            show: 'asOverflow',
            actionCallback: () => this.updateSearchConfig(),
          });
        } else {
          actions.push({
            labelKey:
              'TRAVELCONCESSION_SEARCH.HEADER_ACTIONS.CREATE_SEARCH_CONFIG',
            icon: PrimeIcons.SAVE,
            titleKey:
              'TRAVELCONCESSION_SEARCH.HEADER_ACTIONS.CREATE_SEARCH_CONFIG',
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

  public travelconcessionSearchFormGroup: FormGroup = this.formBuilder.group({
    ...(Object.fromEntries(
      travelconcessionSearchCriteriasSchema
        .keyof()
        .options.map((k) => [k, null])
    ) as Record<keyof TravelconcessionSearchCriteria, unknown>),
  } satisfies Record<keyof TravelconcessionSearchCriteria, unknown>);

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
        titleKey: 'TRAVELCONCESSION_SEARCH.BREADCRUMB',
        labelKey: 'TRAVELCONCESSION_SEARCH.BREADCRUMB',
        routerLink: '/travelconcession',
      },
    ]);
  }

  search(formValue: FormGroup) {
    const searchCriteria = Object.entries(formValue.getRawValue()).reduce(
      (acc: Partial<TravelconcessionSearchCriteria>, [key, value]) => ({
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
      TravelconcessionSearchActions.searchButtonClicked({ searchCriteria })
    );
  }

  details({ id }: RowListGridData) {
    this.store.dispatch(
      TravelconcessionSearchActions.detailsButtonClicked({ id })
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
            TravelconcessionSearchActions.deletionConfirmed({
              id: id as string,
            })
          );
        }
      });
  }

  edit({ id }: RowListGridData) {
    this.store.dispatch(
      TravelconcessionSearchActions.editButtonClicked({ id })
    );
  }

  resetSearch() {
    this.store.dispatch(TravelconcessionSearchActions.resetButtonClicked());
  }

  exportItems() {
    this.viewModel$.pipe(first()).subscribe((data) => {
      this.exportDataService.exportCsv(
        data.displayedColumns,
        data.results,
        'travelconcession.csv'
      );
    });
  }

  searchConfigInfoSelectionChanged(searchConfigInfo: SearchConfigInfo) {
    if (searchConfigInfo) {
      this.store.dispatch(
        TravelconcessionSearchActions.selectedSearchConfigInfo({
          searchConfigInfo: searchConfigInfo,
        })
      );
    } else {
      this.store.dispatch(
        TravelconcessionSearchActions.searchConfigInfoDeselected()
      );
    }
  }

  viewModeChanged(viewMode: 'basic' | 'advanced') {
    this.store.dispatch(
      TravelconcessionSearchActions.viewModeChanged({
        viewMode: viewMode,
      })
    );
  }

  onDisplayedColumnsChange(displayedColumns: DataTableColumn[]) {
    this.store.dispatch(
      TravelconcessionSearchActions.displayedColumnsChanged({
        displayedColumns,
      })
    );
  }

  toggleChartVisibility() {
    this.store.dispatch(TravelconcessionSearchActions.chartVisibilityToggled());
  }

  createSearchConfig(): void {
    this.store.dispatch(
      TravelconcessionSearchActions.createSearchConfigClicked()
    );
  }

  updateSearchConfig(): void {
    this.store.dispatch(
      TravelconcessionSearchActions.updateSearchConfigClicked()
    );
  }

  public onCreate() {
    this.store.dispatch(TravelconcessionSearchActions.createButtonClicked());
  }

  public onDetailClose() {
    this.store.dispatch(TravelconcessionSearchActions.detailDialogClose());
  }
}
