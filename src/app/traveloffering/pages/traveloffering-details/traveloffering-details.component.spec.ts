/* eslint-disable @typescript-eslint/no-var-requires */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TravelofferingDetailsComponent } from './traveloffering-details.component';
import { ActivatedRoute } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import {
  BreadcrumbService,
  PortalCoreModule,
} from '@onecx/portal-integration-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { initialState } from './traveloffering-details.reducers';

describe('TravelofferingDetailsComponent', () => {
  let component: TravelofferingDetailsComponent;
  let fixture: ComponentFixture<TravelofferingDetailsComponent>;
  let breadcrumbService: BreadcrumbService;
  const mockActivatedRoute = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TravelofferingDetailsComponent],
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
          initialState: { traveloffering: { details: initialState } },
        }),
        BreadcrumbService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TravelofferingDetailsComponent);
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
        titleKey: 'TRAVELOFFERING_DETAILS.BREADCRUMB',
        labelKey: 'TRAVELOFFERING_DETAILS.BREADCRUMB',
        routerLink: '/traveloffering',
      },
    ]);
  });
});
