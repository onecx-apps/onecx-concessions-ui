import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TravelconcessionDetailsComponent } from './travelconcession-details.component';
import { ActivatedRoute } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import {
  BreadcrumbService,
  PortalCoreModule,
} from '@onecx/portal-integration-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { initialState } from './travelconcession-details.reducers';

describe('TravelconcessionDetailsComponent', () => {
  let component: TravelconcessionDetailsComponent;
  let fixture: ComponentFixture<TravelconcessionDetailsComponent>;
  let breadcrumbService: BreadcrumbService;
  const mockActivatedRoute = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TravelconcessionDetailsComponent],
      imports: [
        PortalCoreModule,
        LetModule,
        TranslateTestingModule.withTranslations(
          'en',
          require('./../../../../assets/i18n/en.json')
        ).withTranslations('de', require('./../../../../assets/i18n/de.json')),
        HttpClientTestingModule,
      ],
      providers: [
        provideMockStore({
          initialState: { travelconcession: { details: initialState } },
        }),
        BreadcrumbService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TravelconcessionDetailsComponent);
    component = fixture.componentInstance;
    breadcrumbService = TestBed.inject(BreadcrumbService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set breadcrumb items on ngOnInit', () => {
    const breadcrumbServiceSpy = jest.spyOn(breadcrumbService, 'setItems');
    component.ngOnInit();
    expect(breadcrumbServiceSpy).toHaveBeenCalledWith([
      {
        titleKey: 'TRAVELCONCESSION_DETAILS.BREADCRUMB',
        labelKey: 'TRAVELCONCESSION_DETAILS.BREADCRUMB',
        routerLink: '/travelconcession',
      },
    ]);
  });
});
