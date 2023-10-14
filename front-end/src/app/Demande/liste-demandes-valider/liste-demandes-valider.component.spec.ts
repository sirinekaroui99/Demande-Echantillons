import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDemandesValiderComponent } from './liste-demandes-valider.component';

describe('ListeDemandesValiderComponent', () => {
  let component: ListeDemandesValiderComponent;
  let fixture: ComponentFixture<ListeDemandesValiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeDemandesValiderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeDemandesValiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
