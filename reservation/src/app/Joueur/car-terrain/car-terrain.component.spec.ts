import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarTerrainComponent } from './car-terrain.component';

describe('CarTerrainComponent', () => {
  let component: CarTerrainComponent;
  let fixture: ComponentFixture<CarTerrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarTerrainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
