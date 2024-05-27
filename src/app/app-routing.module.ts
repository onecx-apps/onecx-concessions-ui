import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { addInitializeModuleGuard } from '@onecx/portal-integration-angular';

export const routes: Routes = [
  {
    path: 'travelconcession',
    loadChildren: () =>
      import('./travelconcession/travelconcession.module').then(
        (mod) => mod.TravelconcessionModule
      ),
  },
  {
    path: 'traveloffering',
    loadChildren: () =>
      import('./traveloffering/traveloffering.module').then(
        (m) => m.TravelOfferingModule
      ),
  },
  {
    path: '',
    redirectTo: 'traveloffering',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(addInitializeModuleGuard(routes)),
    TranslateModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
