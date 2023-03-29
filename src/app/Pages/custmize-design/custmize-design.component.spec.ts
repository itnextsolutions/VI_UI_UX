import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustmizeDesignComponent } from './custmize-design.component';

describe('CustmizeDesignComponent', () => {
  let component: CustmizeDesignComponent;
  let fixture: ComponentFixture<CustmizeDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustmizeDesignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustmizeDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
