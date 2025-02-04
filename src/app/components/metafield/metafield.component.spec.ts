import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetafieldComponent } from './metafield.component';

describe('MetafieldComponent', () => {
  let component: MetafieldComponent;
  let fixture: ComponentFixture<MetafieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetafieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetafieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
