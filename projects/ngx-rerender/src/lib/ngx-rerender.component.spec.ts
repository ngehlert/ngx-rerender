import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { NgxRerenderComponent } from './ngx-rerender.component';
import { NgxRerenderContentDirective } from './ngx-rerender-content.directive';
import { formatTestString, NgxRerenderTestRendererComponent } from './ngx-rerender.directive.spec';

@Component({
  selector: 'test-component',
  template: `
    <mc-rerender [(trigger)]="trigger">
      <ng-template mcRerenderContent>
        <ngx-rerender-test-component ></ngx-rerender-test-component>
      </ng-template>
    </mc-rerender>
    `,
})
class HostComponent {
  public trigger: number | string | boolean = 0;
}
describe('NgxRerender Directive', () => {
  let spectator: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NgxRerenderComponent,
        NgxRerenderContentDirective,
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

  it('rerenders component on boolean value update', (done): void => {
    spectator.componentInstance.trigger = true;
    spectator.detectChanges();
    expect(NgxRerenderTestRendererComponent.instanceCount).toBe(1);
    expect(spectator.nativeElement.textContent).toBe(formatTestString(1));

    spectator.whenStable().then(() => {
      spectator.detectChanges();
      expect(spectator.componentInstance.trigger).toBe(false);

      spectator.componentInstance.trigger = true;
      spectator.detectChanges();
      expect(NgxRerenderTestRendererComponent.instanceCount).toBe(2);
      expect(spectator.nativeElement.textContent).toBe(formatTestString(2));

      spectator.whenStable().then(() => {
        spectator.detectChanges();
        expect(spectator.componentInstance.trigger).toBe(false);

        spectator.componentInstance.trigger = true;
        spectator.detectChanges();
        expect(NgxRerenderTestRendererComponent.instanceCount).toBe(3);
        expect(spectator.nativeElement.textContent).toBe(formatTestString(3));

        done();
      });
    });
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

  it('does render component properly if no trigger binding is defined', (): void => {
    // @ts-ignore
    spectator.componentInstance.trigger = undefined;
    spectator.detectChanges();
    expect(NgxRerenderTestRendererComponent.instanceCount).toBe(1);
    expect(spectator.nativeElement.textContent).toBe(formatTestString(1));
  });
});
