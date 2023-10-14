import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheCertificatComponent } from './affiche-certificat.component';

describe('AfficheCertificatComponent', () => {
  let component: AfficheCertificatComponent;
  let fixture: ComponentFixture<AfficheCertificatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficheCertificatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficheCertificatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
