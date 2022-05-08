import { Directive, EventEmitter, Input, Output, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[mcRerender]',
})
class NgxRerenderDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() public set mcRerender(_val: unknown) {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
  }
}

export { NgxRerenderDirective };
