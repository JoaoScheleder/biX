import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProdutoDialogComponent } from './create-produto-dialog.component';

describe('CreateProdutoDialogComponent', () => {
  let component: CreateProdutoDialogComponent;
  let fixture: ComponentFixture<CreateProdutoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProdutoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProdutoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
