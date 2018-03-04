import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListvirexterneComponent } from './listvirexterne.component';

describe('ListvirexterneComponent', () => {
  let component: ListvirexterneComponent;
  let fixture: ComponentFixture<ListvirexterneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListvirexterneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListvirexterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
