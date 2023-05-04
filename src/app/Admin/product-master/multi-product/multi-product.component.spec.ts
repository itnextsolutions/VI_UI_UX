import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiProductComponent } from './multi-product.component';

describe('MultiProductComponent', () => {
  let component: MultiProductComponent;
  let fixture: ComponentFixture<MultiProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
