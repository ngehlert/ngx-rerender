import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxRerenderComponent } from './ngx-rerender.component';

describe('NgxRerenderComponent', () => {
  let component: NgxRerenderComponent;
  let fixture: ComponentFixture<NgxRerenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxRerenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxRerenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
