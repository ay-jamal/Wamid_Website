import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: "home",
        pathMatch: "full"
    }
    , {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'our-partners',
        loadComponent: () => import('./pages/our-partners/our-partners.component')
            .then(m => m.OurPartnersComponent)
    }
];
