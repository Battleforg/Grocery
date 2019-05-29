import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGroceryDetailComponent } from './view-grocery-detail.component';

describe('ViewGroceryDetailComponent', () => {
  let component: ViewGroceryDetailComponent;
  let fixture: ComponentFixture<ViewGroceryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGroceryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGroceryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
