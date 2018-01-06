import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostNewsFormComponent } from './post-news-form.component';

describe('PostNewsFormComponent', () => {
  let component: PostNewsFormComponent;
  let fixture: ComponentFixture<PostNewsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostNewsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostNewsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
