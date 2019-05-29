import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGroceryItemsComponent } from './view-grocery-items.component';

describe('ViewGroceryItemsComponent', () => {
  let component: ViewGroceryItemsComponent;
  let fixture: ComponentFixture<ViewGroceryItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGroceryItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGroceryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
