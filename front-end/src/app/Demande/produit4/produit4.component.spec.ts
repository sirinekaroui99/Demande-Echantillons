import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Produit4Component } from './produit4.component';

describe('Produit4Component', () => {
  let component: Produit4Component;
  let fixture: ComponentFixture<Produit4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Produit4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Produit4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
