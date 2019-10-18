import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IgPostComponent } from './ig-post.component';

describe('IgPostComponent', () => {
  let component: IgPostComponent;
  let fixture: ComponentFixture<IgPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IgPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IgPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
