import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GroceryItemService } from '../services/grocery-item.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
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
  isDeleteSuccess = true;

  // unsubscribe all subsrciption in this component
  private unsubscribe$ = new Subject<void>();

  private gid: string;

  constructor(
    private groceryItemService: GroceryItemService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
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
        this.gid = response.grocery.gid;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  invalidTitle(): boolean {
    return this.serverErrors.title !== undefined;
  }

  goBack() {
    this.router.navigate(['viewItems']);
  }

  /**
   * Delete this item form the list
   */
  deleteItem(): void {
    // pop up confirm dialog
    const isDelete: boolean = window.confirm('Do you want to delete this item?');

    if (isDelete) {
      // call delete service
      this.groceryItemService.deleteItemById(this.gid)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(response => {
        this.isDeleteSuccess = response.success;
        if (this.isDeleteSuccess) {
          // go back to item list
          this.router.navigate(['viewItems']);
        }
      });
    }
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
