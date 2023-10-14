import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Produit2Component } from './produit2.component';

describe('Produit2Component', () => {
  let component: Produit2Component;
  let fixture: ComponentFixture<Produit2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Produit2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Produit2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
