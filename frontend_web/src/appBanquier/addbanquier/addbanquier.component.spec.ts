import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbanquierComponent } from './addbanquier.component';

describe('AddbanquierComponent', () => {
  let component: AddbanquierComponent;
  let fixture: ComponentFixture<AddbanquierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbanquierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbanquierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
