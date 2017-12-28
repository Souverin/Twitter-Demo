import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SbElseWallComponent } from './sb-else-wall.component';

describe('SbElseWallComponent', () => {
  let component: SbElseWallComponent;
  let fixture: ComponentFixture<SbElseWallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SbElseWallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SbElseWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
