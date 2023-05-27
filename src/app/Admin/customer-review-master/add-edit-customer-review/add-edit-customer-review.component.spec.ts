import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCustomerReviewComponent} from './add-edit-customer-review.component';

describe('AddEditReviewComponent', () => {
  let component: AddEditCustomerReviewComponent;
  let fixture: ComponentFixture<AddEditCustomerReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCustomerReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCustomerReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
