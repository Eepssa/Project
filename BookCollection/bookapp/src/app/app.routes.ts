import { Routes } from '@angular/router';
import { ListComponent } from '../components/list/list/list.component';
import { AddComponent } from '../components/add/add/add.component';
import { EditComponent } from '../components/edit/edit/edit.component';
import { ViewComponent } from '../components/view/view.component';
import { NfComponent } from '../components/nf/nf/nf.component';

export const routes: Routes = [
    {path: '', component: ListComponent},
    {path: 'add', component: AddComponent},
    {path: 'edit/:id', component: EditComponent},
    {path: 'view/:id', component: ViewComponent},     
    {path: '**', component: NfComponent}
];