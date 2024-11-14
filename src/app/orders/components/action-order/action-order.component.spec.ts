import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionOrderComponent } from './action-order.component';

describe('ActionOrderComponent', () => {
  let component: ActionOrderComponent;
  let fixture: ComponentFixture<ActionOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActionOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
