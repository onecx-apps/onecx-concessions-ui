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
import { TravelofferingDetailsComponent } from './pages/traveloffering-details/traveloffering-details.component';
import { TravelofferingDetailsEffects } from './pages/traveloffering-details/traveloffering-details.effects';
import { TravelofferingSearchComponent } from './pages/traveloffering-search/traveloffering-search.component';
import { TravelofferingSearchEffects } from './pages/traveloffering-search/traveloffering-search.effects';
import { TravelOfferingFormComponent } from './traveloffering-form/traveloffering-form.component';
import { travelofferingFeature } from './traveloffering.reducers';
import { routes } from './traveloffering.routes';
import { TravelOfferingDetailComponent } from './traveloffering-detail/traveloffering-detail.component';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [
    TravelofferingDetailsComponent,
    TravelofferingSearchComponent,
    TravelOfferingFormComponent,
    TravelOfferingDetailComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    DynamicDialogModule,
    CommonModule,
    SharedModule,
    LetModule,
    PortalCoreModule.forMicroFrontend(),
    RouterModule.forChild(addInitializeModuleGuard(routes)),
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    StoreModule.forFeature(travelofferingFeature),
    EffectsModule.forFeature([
      TravelofferingDetailsEffects,
      TravelofferingSearchEffects,
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
export class TravelOfferingModule {}
