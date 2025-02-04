import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetatableComponent } from './metatable.component';

describe('MetatableComponent', () => {
  let component: MetatableComponent;
  let fixture: ComponentFixture<MetatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetatableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
