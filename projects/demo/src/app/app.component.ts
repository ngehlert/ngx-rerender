import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public directiveWithNumberTrigger: number = 0;

  public componentWithBooleanTrigger: boolean = false;

  public rerenderDirectiveWithNumber(): void {
    this.directiveWithNumberTrigger++;
  }

  public rerenderComponentWithBoolean(): void {
    this.componentWithBooleanTrigger = true;
  }
}
