import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlefetchComponent } from './handlefetch.component';

describe('HandlefetchComponent', () => {
  let component: HandlefetchComponent;
  let fixture: ComponentFixture<HandlefetchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandlefetchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandlefetchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
