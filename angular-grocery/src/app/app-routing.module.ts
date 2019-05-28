import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddGroceryItemComponent } from './add-grocery-item/add-grocery-item.component';

const routes: Routes = [
  { path: '', component: AddGroceryItemComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
