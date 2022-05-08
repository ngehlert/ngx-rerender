import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxRerenderModule } from '../../../ngx-rerender/src/lib/ngx-rerender.module';
import { TestComponent } from './test.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxRerenderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
