import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Produit5Component } from './produit5.component';

describe('Produit5Component', () => {
  let component: Produit5Component;
  let fixture: ComponentFixture<Produit5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Produit5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Produit5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
