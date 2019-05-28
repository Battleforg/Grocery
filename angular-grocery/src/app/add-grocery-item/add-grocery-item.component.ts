import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GroceryItem } from '../entities/grocery-item';
import { Subject } from 'rxjs';
import { GroceryItemService } from '../services/grocery-item.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-grocery-item',
  templateUrl: './add-grocery-item.component.html',
  styleUrls: ['./add-grocery-item.component.css']
})
export class AddGroceryItemComponent implements OnDestroy {
  // reactive form control
  itemForm = this.fb.group({
    title: ['', Validators.required],
    notes: ['']
  });

  itemListLength = 0;

  // unsubscribe all subsrciption in this component
  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private groceryItemService: GroceryItemService
  ) { }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    const newGroceryItem = new GroceryItem(this.itemForm.value.title, this.itemForm.value.notes);
    this.groceryItemService.addItem(newGroceryItem)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(response => {
        this.itemListLength = response.groceryListLength;
      });
  }

}
