import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenTestComponent } from './ben-test.component';

describe('BenTestComponent', () => {
  let component: BenTestComponent;
  let fixture: ComponentFixture<BenTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
