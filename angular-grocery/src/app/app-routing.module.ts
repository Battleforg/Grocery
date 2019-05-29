import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddGroceryItemComponent } from './add-grocery-item/add-grocery-item.component';
import { ViewGroceryItemsComponent } from './view-grocery-items/view-grocery-items.component';
import { ViewGroceryDetailComponent } from './view-grocery-detail/view-grocery-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/addItem', pathMatch: 'full'},
  { path: 'addItem', component: AddGroceryItemComponent},
  { path: 'viewItems', component: ViewGroceryItemsComponent},
  { path: 'itemDeatil/:gid', component: ViewGroceryDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
