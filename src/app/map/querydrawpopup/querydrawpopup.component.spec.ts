import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuerydrawpopupComponent } from './querydrawpopup.component';

describe('QuerydrawpopupComponent', () => {
  let component: QuerydrawpopupComponent;
  let fixture: ComponentFixture<QuerydrawpopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuerydrawpopupComponent]
    });
    fixture = TestBed.createComponent(QuerydrawpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
