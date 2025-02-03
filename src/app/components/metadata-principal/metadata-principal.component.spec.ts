import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataPrincipalComponent } from './metadata-principal.component';

describe('MetadataPrincipalComponent', () => {
  let component: MetadataPrincipalComponent;
  let fixture: ComponentFixture<MetadataPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetadataPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
