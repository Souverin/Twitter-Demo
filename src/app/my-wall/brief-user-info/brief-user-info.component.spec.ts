import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefUserInfoComponent } from './brief-user-info.component';

describe('BriefUserInfoComponent', () => {
  let component: BriefUserInfoComponent;
  let fixture: ComponentFixture<BriefUserInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefUserInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
