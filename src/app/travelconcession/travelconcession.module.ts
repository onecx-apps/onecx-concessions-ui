import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import {
  AppStateService,
  PortalCoreModule,
  PortalMissingTranslationHandler,
  addInitializeModuleGuard,
  createTranslateLoader,
} from '@onecx/portal-integration-angular';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from '../shared/shared.module';
import { TravelconcessionDetailsComponent } from './pages/travelconcession-details/travelconcession-details.component';
import { TravelconcessionDetailsEffects } from './pages/travelconcession-details/travelconcession-details.effects';
import { TravelconcessionSearchComponent } from './pages/travelconcession-search/travelconcession-search.component';
import { TravelconcessionSearchEffects } from './pages/travelconcession-search/travelconcession-search.effects';
import { travelconcessionFeature } from './travelconcession.reducers';
import { routes } from './travelconcession.routes';

@NgModule({
  declarations: [
    TravelconcessionDetailsComponent,
    TravelconcessionDetailsComponent,
    TravelconcessionSearchComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    SharedModule,
    LetModule,
    PortalCoreModule.forMicroFrontend(),
    RouterModule.forChild(addInitializeModuleGuard(routes)),
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    StoreModule.forFeature(travelconcessionFeature),
    EffectsModule.forFeature([
      TravelconcessionDetailsEffects,
      TravelconcessionDetailsEffects,
      TravelconcessionSearchEffects,
    ]),
    TranslateModule.forRoot({
      extend: true,
      isolate: false,
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient, AppStateService],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: PortalMissingTranslationHandler,
      },
    }),
  ],
})
export class TravelconcessionModule {}
