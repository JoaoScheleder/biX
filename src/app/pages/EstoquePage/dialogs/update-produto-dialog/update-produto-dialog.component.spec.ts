import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProdutoDialogComponent } from './update-produto-dialog.component';

describe('UpdateProdutoDialogComponent', () => {
  let component: UpdateProdutoDialogComponent;
  let fixture: ComponentFixture<UpdateProdutoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProdutoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProdutoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
