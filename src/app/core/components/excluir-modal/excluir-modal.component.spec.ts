import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirModalComponent } from './excluir-modal.component';

describe('ExcluirModalComponent', () => {
  let component: ExcluirModalComponent;
  let fixture: ComponentFixture<ExcluirModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcluirModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcluirModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
