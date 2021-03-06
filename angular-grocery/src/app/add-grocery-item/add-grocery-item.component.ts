import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GroceryItem } from '../entities/grocery-item';
import { Subject } from 'rxjs';
import { GroceryItemService } from '../services/grocery-item.service';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-grocery-item',
  templateUrl: './add-grocery-item.component.html',
  styleUrls: ['./add-grocery-item.component.css']
})
export class AddGroceryItemComponent implements OnDestroy, OnInit {
  // reactive form control
  itemForm = this.fb.group({
    title: ['', Validators.required],
    notes: ['']
  });

  itemListLength = 0;

  serverErrors: any = {};

  // unsubscribe all subsrciption in this component
  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private groceryItemService: GroceryItemService,
    private router: Router
  ) { }

  ngOnInit() {
    this.groceryItemService.getAllItems()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(items => {
      this.itemListLength = items.list.length;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  invalidTitle(): boolean {
    return this.serverErrors.title !== undefined;
  }

  goViewItemList(): void {
    this.router.navigate(['viewItems']);
  }

  onSubmit() {
    const newGroceryItem = new GroceryItem(this.itemForm.value.title, this.itemForm.value.notes);
    this.groceryItemService.addItem(newGroceryItem)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(response => {
        this.itemListLength = response.groceryListLength;
        this.serverErrors = {};
      }, error => {
        this.serverErrors = error.error.error;
      });
  }

}
