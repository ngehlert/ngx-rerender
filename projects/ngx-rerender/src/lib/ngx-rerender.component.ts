import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgxRerenderContentDirective } from './ngx-rerender-content.directive';

@Component({
  selector: 'mc-rerender',
  template: `
    <ng-container [ngTemplateOutlet]="content.templateRef" #outlet></ng-container>
  `,
})
export class NgxRerenderComponent implements OnChanges {
  @ViewChild('outlet', { read: ViewContainerRef }) outletRef?: ViewContainerRef;
  @ContentChild(NgxRerenderContentDirective) public content!: NgxRerenderContentDirective;
  @Input() public trigger: boolean | number | string | unknown;
  @Output() public triggerChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes.trigger || changes.trigger.currentValue === undefined) {
      return;
    }
    const triggerValue: boolean | number | string | unknown = changes.trigger.currentValue;

    if (!this.outletRef) {
      /**
       * Even if the initial outlet is not yet ready on the first onChange
       * we still ne to reset the boolean binding,
       * otherwise the next change to true will not properly be tracked
       */
      if (typeof triggerValue === 'boolean') {
        this.setBooleanBindingToFalse();
      }
      return;
    }

    if (typeof triggerValue !== 'boolean') {
      this.rerender();

      return;
    }
    if (triggerValue) {
      this.rerender();
      this.setBooleanBindingToFalse();
    }
  }

  private rerender(): void {
    if (!this.outletRef) {
      return;
    }

    this.outletRef.clear();
    this.outletRef.createEmbeddedView(this.content.templateRef);
  }

  private setBooleanBindingToFalse(): void {
    setTimeout(() => this.triggerChange.emit(false));
  }
}
