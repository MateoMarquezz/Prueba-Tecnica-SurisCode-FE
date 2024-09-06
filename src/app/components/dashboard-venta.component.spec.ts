import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVentaComponent } from './dashboard-venta.component';

describe('DashboardVentaComponent', () => {
  let component: DashboardVentaComponent;
  let fixture: ComponentFixture<DashboardVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardVentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
