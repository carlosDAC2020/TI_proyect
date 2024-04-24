import { Routes } from '@angular/router';

import {IndexViewComponent} from './index-view/index-view.component'
import {ValidViewComponent} from './valid-view/valid-view.component'
export const routes: Routes = [
    { path: 'index', component: IndexViewComponent },
    { path: 'validation', component: ValidViewComponent },
    { path: '', redirectTo: '/index', pathMatch: 'full' } 
];
