import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { JobListComponent } from './pages/jobs/job-list/job-list.component';
import { JobsComponent } from './pages/jobs/jobs.component';

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
    },
    {
        path: 'jobs',
        component: JobsComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/jobs/job-list/job-list.component')
                    .then(m => m.JobListComponent)
            },
            {
                path: ':id',
                loadComponent: () => import('./pages/jobs/job-details/job-details.component')
                    .then(m => m.JobDetailsComponent)
            }
        ]
    }
];
