import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherDemandeComponent } from './afficher-demande.component';

describe('AfficherDemandeComponent', () => {
  let component: AfficherDemandeComponent;
  let fixture: ComponentFixture<AfficherDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherDemandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
