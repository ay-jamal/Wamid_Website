import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { JobsComponent } from './pages/jobs/jobs.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: "home",
        pathMatch: "full"
    }
    , {
        path: 'home',
        component: HomeComponent,
        data: { animation: 'HomePage' }
    },
    {
        path: 'our-partners',
        loadComponent: () => import('./pages/our-partners/our-partners.component')
            .then(m => m.OurPartnersComponent),
        data: { animation: 'our-partners' }
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
                path: 'job-seeker-registration',
                loadComponent: () => import('./pages/jobs/job-seeker-registration/job-seeker-registration.component')
                    .then(m => m.JobSeekerRegistrationComponent)
            },
            {
                path: ':id',
                loadComponent: () => import('./pages/jobs/job-details/job-details.component')
                    .then(m => m.JobDetailsComponent)
            },
        ]
    },
    {
        path: 'newes',
        loadComponent: () => import('./pages/newes/newes.component')
            .then(m => m.NewesComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/newes/newes-list/newes-list.component')
                    .then(m => m.NewesListComponent)
            },
            {
                path: ':id',
                loadComponent: () => import('./pages/newes/newes-detalis/newes-detalis.component')
                    .then(m => m.NewesDetalisComponent)
            }
        ]
    },
    {
        path: '**',
        loadComponent: () => import('./shared/under-construction/under-construction.component')
            .then(m => m.UnderConstructionComponent)
    }

];
