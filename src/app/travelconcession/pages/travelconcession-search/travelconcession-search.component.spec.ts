/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { ofType } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  PortalCoreModule,
  PortalDialogService,
} from '@onecx/portal-integration-angular';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TravelconcessionSearchActions } from './travelconcession-search.actions';
import { TravelconcessionSearchComponent } from './travelconcession-search.component';
import { initialState } from './travelconcession-search.reducers';

describe('TravelconcessionSearchComponent', () => {
  let component: TravelconcessionSearchComponent;
  let fixture: ComponentFixture<TravelconcessionSearchComponent>;
  let store: MockStore<Store>;
  let formBuilder: FormBuilder;

  const mockActivatedRoute = {};

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TravelconcessionSearchComponent],
      imports: [
        PortalCoreModule,
        LetModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        TranslateTestingModule.withTranslations(
          'en',
          require('./../../../../assets/i18n/en.json')
        ).withTranslations('de', require('./../../../../assets/i18n/de.json')),
        HttpClientTestingModule,
      ],
      providers: [
        PortalDialogService,
        provideMockStore({
          initialState: { travelconcession: { search: initialState } },
        }),
        FormBuilder,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelconcessionSearchComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch searchButtonClicked action on search', (done) => {
    const formValue = formBuilder.group({
      changeMe: '123',
    });
    component.travelconcessionSearchFormGroup = formValue;

    store.scannedActions$
      .pipe(ofType(TravelconcessionSearchActions.searchButtonClicked))
      .subscribe((a) => {
        expect(a.searchCriteria).toEqual({ changeMe: '123' });
        done();
      });

    component.search(formValue);
  });

  it('should dispatch resetButtonClicked action on resetSearch', (done) => {
    store.scannedActions$
      .pipe(ofType(TravelconcessionSearchActions.resetButtonClicked))
      .subscribe(() => {
        done();
      });

    component.resetSearch();
  });
});
