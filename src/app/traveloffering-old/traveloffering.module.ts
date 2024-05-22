import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import {
  addInitializeModuleGuard,
  InitializeModuleGuard,
  PortalCoreModule,
} from '@onecx/portal-integration-angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { TravelOfferingSearchComponent } from './pages/traveloffering-search/traveloffering-search.component';
import { TravelOfferingCriteriaComponent } from './pages/traveloffering-search/traveloffering-criteria/traveloffering-criteria.component';

const routes: Routes = [
  {
    path: '',
    component: TravelOfferingSearchComponent,
    pathMatch: 'full',
  },
];
@NgModule({
  declarations: [
    TravelOfferingSearchComponent,
    TravelOfferingCriteriaComponent,
  ],
  //  HelpDetailComponent, HelpCriteriaComponent, HelpFormComponent
  imports: [
    CommonModule,
    FormsModule,
    PortalCoreModule.forMicroFrontend(),
    [RouterModule.forChild(addInitializeModuleGuard(routes))],
    SharedModule,
  ],
  providers: [InitializeModuleGuard],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class TravelOfferingModule {
  constructor() {
    console.info('TravelOffering Module constructor');
  }
}
