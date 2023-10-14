import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Produit3Component } from './produit3.component';

describe('Produit3Component', () => {
  let component: Produit3Component;
  let fixture: ComponentFixture<Produit3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Produit3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Produit3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
