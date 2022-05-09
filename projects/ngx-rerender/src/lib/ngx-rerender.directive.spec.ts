// eslint-disable-next-line max-classes-per-file
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxRerenderDirective } from './ngx-rerender.directive';

export function formatTestString(value: number): string {
  return `Component is rendered. Current iteration: ${value}`;
}

@Component({
  selector: 'ngx-rerender-test-component',
  template: '{{getDisplayValue()}}',
})
export class NgxRerenderTestRendererComponent implements OnInit {
  public static instanceCount = 0;

  public ngOnInit(): void {
    NgxRerenderTestRendererComponent.instanceCount += 1;
  }

  public getDisplayValue(): string {
    return formatTestString(NgxRerenderTestRendererComponent.instanceCount);
  }
}
@Component({
  selector: 'test-component',
  template: '<ngx-rerender-test-component *mcRerender="trigger"></ngx-rerender-test-component>',
})
class HostComponent {
  @Input() public trigger: number | string | boolean = 0;
}
describe('NgxRerender Directive', () => {
  let spectator: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NgxRerenderDirective,
        NgxRerenderTestRendererComponent,
        HostComponent,
      ],
      imports: [
        CommonModule,
      ],
    }).compileComponents();
    NgxRerenderTestRendererComponent.instanceCount = 0;
    spectator = TestBed.createComponent(HostComponent);
  });

  it('renders component by default', (): void => {
    spectator.detectChanges();
    expect(NgxRerenderTestRendererComponent.instanceCount).toBe(1);
    expect(spectator.nativeElement.textContent).toBe(formatTestString(1));
  });

  it('rerenders component on number value update', (): void => {
    spectator.componentInstance.trigger = 0;
    spectator.detectChanges();
    expect(NgxRerenderTestRendererComponent.instanceCount).toBe(1);
    expect(spectator.nativeElement.textContent).toBe(formatTestString(1));

    spectator.componentInstance.trigger = 1;
    spectator.detectChanges();
    expect(NgxRerenderTestRendererComponent.instanceCount).toBe(2);
    expect(spectator.nativeElement.textContent).toBe(formatTestString(2));

    spectator.componentInstance.trigger = 555;
    spectator.detectChanges();
    expect(NgxRerenderTestRendererComponent.instanceCount).toBe(3);
    expect(spectator.nativeElement.textContent).toBe(formatTestString(3));
  });

  it('rerenders component on string value update', (): void => {
    spectator.componentInstance.trigger = 'abc';
    spectator.detectChanges();
    expect(NgxRerenderTestRendererComponent.instanceCount).toBe(1);
    expect(spectator.nativeElement.textContent).toBe(formatTestString(1));

    spectator.componentInstance.trigger = 'cbd';
    spectator.detectChanges();
    expect(NgxRerenderTestRendererComponent.instanceCount).toBe(2);
    expect(spectator.nativeElement.textContent).toBe(formatTestString(2));

    spectator.componentInstance.trigger = 'test';
    spectator.detectChanges();
    expect(NgxRerenderTestRendererComponent.instanceCount).toBe(3);
    expect(spectator.nativeElement.textContent).toBe(formatTestString(3));
  });

  it('does not rerender component if trigger value is not update', (): void => {
    spectator.componentInstance.trigger = 1;
    spectator.detectChanges();
    expect(NgxRerenderTestRendererComponent.instanceCount).toBe(1);
    expect(spectator.nativeElement.textContent).toBe(formatTestString(1));

    spectator.componentInstance.trigger = 1;
    spectator.detectChanges();
    expect(NgxRerenderTestRendererComponent.instanceCount).toBe(1);
    expect(spectator.nativeElement.textContent).toBe(formatTestString(1));

    spectator.componentInstance.trigger = 1;
    spectator.detectChanges();
    expect(NgxRerenderTestRendererComponent.instanceCount).toBe(1);
    expect(spectator.nativeElement.textContent).toBe(formatTestString(1));
  });
});
