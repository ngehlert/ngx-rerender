import { NgModule } from '@angular/core';
import { NgxRerenderComponent } from './ngx-rerender.component';
import { NgxRerenderDirective } from './ngx-rerender.directive';
import { NgxRerenderContentDirective } from './ngx-rerender-content.directive';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    NgxRerenderComponent,
    NgxRerenderDirective,
    NgxRerenderContentDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    NgxRerenderComponent,
    NgxRerenderDirective,
    NgxRerenderContentDirective
  ]
})
export class NgxRerenderModule { }
