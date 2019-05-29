import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GroceryItemService } from '../services/grocery-item.service';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { GroceryItem } from '../entities/grocery-item';

@Component({
  selector: 'app-view-grocery-detail',
  templateUrl: './view-grocery-detail.component.html',
  styleUrls: ['./view-grocery-detail.component.css']
})
export class ViewGroceryDetailComponent implements OnInit, OnDestroy {

  // reactive form control
  itemForm = this.fb.group({
    title: ['', Validators.required],
    notes: ['']
  });

  serverErrors: any = {};

  // unsubscribe all subsrciption in this component
  private unsubscribe$ = new Subject<void>();

  constructor(
    private groceryItemService: GroceryItemService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const gid = this.route.snapshot.paramMap.get('gid');
    this.groceryItemService.getItemById(gid)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(response => {
      this.itemForm.patchValue({
        title: response.grocery.title,
        notes: response.grocery.notes
      });
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  invalidTitle(): boolean {
    return this.serverErrors.title !== undefined;
  }

  onSubmit() {
    const newGroceryItem = new GroceryItem(this.itemForm.value.title, this.itemForm.value.notes);
    this.groceryItemService.addItem(newGroceryItem)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(response => {
        this.serverErrors = {};
      }, error => {
        this.serverErrors = error.error.error;
      });
  }

}
