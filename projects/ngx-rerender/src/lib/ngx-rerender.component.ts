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
  @ContentChild(NgxRerenderContentDirective)
  content!: NgxRerenderContentDirective;

  @Input() public trigger: boolean | number | string | unknown;
  @Output() public triggerChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  public ngOnChanges(changes: SimpleChanges): void {
    if (!this.outletRef) {
      return;
    }
    if (!changes.trigger || changes.trigger.currentValue === undefined) {
      return;
    }
    const triggerValue: boolean | number | string | unknown =
      changes.trigger.currentValue;
    if (typeof triggerValue !== 'boolean') {
      this.rerender();

      return;
    }
    if (triggerValue) {
      this.rerender();
      setTimeout(() => this.triggerChange.emit(false));
    }
  }

  private rerender(): void {
    if (!this.outletRef) {
      return;
    }

    this.outletRef.clear();
    this.outletRef.createEmbeddedView(this.content.templateRef);
  }
}
