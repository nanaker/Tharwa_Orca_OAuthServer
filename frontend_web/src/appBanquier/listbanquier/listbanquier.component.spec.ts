import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbanquierComponent } from './listbanquier.component';

describe('ListbanquierComponent', () => {
  let component: ListbanquierComponent;
  let fixture: ComponentFixture<ListbanquierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListbanquierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListbanquierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
