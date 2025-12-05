import { Routes } from '@angular/router';
import { LandingPageComponent } from './views/landing/landing-page/landing-page.component';
import { LoginComponent } from './views/auth/login/login.component';
import { SignupComponent } from './views/auth/signup/signup.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CompaniesComponent } from './views/companies/companies.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { TableComponent } from './views/dashboard/table/table.component';
import { CardsComponent } from './views/dashboard/cards/cards.component';
import { NoteComponent } from './views/note/note.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'companies', component: CompaniesComponent },
    { path: 'login', component: LoginComponent,},
    { path: 'note', component: NoteComponent,},
    { path: 'dashboard', component: DashboardComponent,
        children:[
            {
                path:'table',
                component:TableComponent
            },
            {
                path:'cards',
                component:CardsComponent
            }
        ]
    },
    { path: 'register', component: SignupComponent, canActivate: [AuthGuard], data: { permission: 'register' } }
];
