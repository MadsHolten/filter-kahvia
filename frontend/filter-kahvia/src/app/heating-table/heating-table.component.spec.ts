import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatingTableComponent } from './heating-table.component';

describe('HeatingTableComponent', () => {
  let component: HeatingTableComponent;
  let fixture: ComponentFixture<HeatingTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatingTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
