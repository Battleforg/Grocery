import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

import { GroceryItemService } from '../services/grocery-item.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-view-grocery-items',
  templateUrl: './view-grocery-items.component.html',
  styleUrls: ['./view-grocery-items.component.css']
})
export class ViewGroceryItemsComponent implements OnInit, OnDestroy {

  // unsubscribe all subsrciption in this component
  private unsubscribe$ = new Subject<void>();

  itemList: any = [];

  constructor(
    private router: Router,
    private groceryItemService: GroceryItemService
  ) { }

  ngOnInit() {
    this.groceryItemService.getAllItems()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(items => {
        this.itemList = items.list;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  goBack(): void {
    this.router.navigate(['addItem']);
  }

}
