import { TravelofferingDetailsComponent } from './pages/traveloffering-details/traveloffering-details.component';
import { Routes } from '@angular/router';
import { TravelofferingSearchComponent } from './pages/traveloffering-search/traveloffering-search.component';

export const routes: Routes = [
  {
    path: 'details/:id',
    component: TravelofferingDetailsComponent,
    pathMatch: 'full',
  },
  { path: '', component: TravelofferingSearchComponent, pathMatch: 'full' },
];
