import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BixTableComponent } from './bix-table.component';

describe('BixTableComponent', () => {
  let component: BixTableComponent;
  let fixture: ComponentFixture<BixTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BixTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BixTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
