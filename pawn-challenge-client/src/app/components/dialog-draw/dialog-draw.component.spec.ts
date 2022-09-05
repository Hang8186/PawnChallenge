import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDrawComponent } from './dialog-draw.component';

describe('DialogDrawComponent', () => {
  let component: DialogDrawComponent;
  let fixture: ComponentFixture<DialogDrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDrawComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
