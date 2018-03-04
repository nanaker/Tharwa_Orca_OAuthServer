import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbanqueComponent } from './listbanque.component';

describe('ListbanqueComponent', () => {
  let component: ListbanqueComponent;
  let fixture: ComponentFixture<ListbanqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListbanqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListbanqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
