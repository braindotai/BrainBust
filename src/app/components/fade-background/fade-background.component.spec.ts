import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FadeBackgroundComponent } from './fade-background.component';

describe('FadeBackgroundComponent', () => {
  let component: FadeBackgroundComponent;
  let fixture: ComponentFixture<FadeBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FadeBackgroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FadeBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
