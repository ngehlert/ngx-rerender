import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[mcRerenderContent]',
})
export class NgxRerenderContentDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
