import { TravelconcessionDetailsComponent } from './pages/travelconcession-details/travelconcession-details.component';
import { TravelconcessionSearchComponent } from './pages/travelconcession-search/travelconcession-search.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'details/:id',
    component: TravelconcessionDetailsComponent,
    pathMatch: 'full',
  },
  { path: '', component: TravelconcessionSearchComponent, pathMatch: 'full' },
];
