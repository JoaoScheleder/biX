import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClienteDialogComponent } from './create-cliente-dialog.component';

describe('CreateClienteDialogComponent', () => {
  let component: CreateClienteDialogComponent;
  let fixture: ComponentFixture<CreateClienteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateClienteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClienteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
