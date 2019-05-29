import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AddGroceryItemComponent } from './add-grocery-item/add-grocery-item.component';
import { AppRoutingModule } from './app-routing.module';
import { ViewGroceryItemsComponent } from './view-grocery-items/view-grocery-items.component';
import { ViewGroceryDetailComponent } from './view-grocery-detail/view-grocery-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AddGroceryItemComponent,
    ViewGroceryItemsComponent,
    ViewGroceryDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
