import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClienteDialogComponent } from './update-cliente-dialog.component';

describe('UpdateClienteDialogComponent', () => {
  let component: UpdateClienteDialogComponent;
  let fixture: ComponentFixture<UpdateClienteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateClienteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateClienteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
