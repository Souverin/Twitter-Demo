import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundListComponent } from './found-list.component';

describe('FoundListComponent', () => {
  let component: FoundListComponent;
  let fixture: ComponentFixture<FoundListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoundListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
