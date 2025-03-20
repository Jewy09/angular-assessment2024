import { Routes } from '@angular/router';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ContactListComponent},
  { path: 'contact/:id', component: ContactDetailsComponent},
  { path: '**', component: PageNotFoundComponent}
];
