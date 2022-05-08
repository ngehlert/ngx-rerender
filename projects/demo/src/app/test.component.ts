import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'test',
  template: `<p>This is child component {{key}} with its {{getCurrentNumber()}} rerender</p>`,
})

export class TestComponent implements OnInit {
  @Input() public key: string = '';
  private static countByKey: Map<string, number> = new Map<string, number>();

  public ngOnInit() {
    TestComponent.countByKey.set(this.key, (TestComponent.countByKey.get(this.key) || 0) + 1);
    console.log('child onInit', this.getCurrentNumber());
  }

  public ngOnDestroy() {
    console.log('child onDestroy', this.getCurrentNumber());
  }

  public getCurrentNumber() {
    return TestComponent.countByKey.get(this.key);
  }
}
