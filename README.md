# ngx-rerender
`ngx-rerender` is a small Angular library, that allows you to completely re-render a specific component/code block of your application.  
In contrast to the regular Angular lifecycle change updates, this will completely render the given code block from scratch, so even hooks like `OnInit` will be called again. 

## Table of contents
* [Installation](#installation)
* [Usage](#usage)
  * [With direct](#with-directive)
  * [With component](#with-component)
* [Why](#why)
  * [Past workarounds](#past-workarounds)
    * [The ngIf "Have you tried turning it off and on again?"](#the-ngif-have-you-tried-turning-it-off-and-on-again)
    * [The ngFor "smart" workaround](#the-ngfor-smart-workaround)
* [How](#how)
* [FAQ](#faq)
* [License](#license)

## Installation
See [npm documentation](https://docs.npmjs.com/) on how to get started with npm.
```bash
npm install --save ngx-rerender
```

## Usage

Add the module import to your Angular module
````typescript
import { NgxRerenderModule } from 'ngx-rerender';
@NgModule({
  ...
  imports: [
    ...
    NgxRerenderModule,
  ],
})
export class MyModule {}
````

### With directive
After you've added the module import you can attach the `*mcRerender` directive to any element you like to rerender.  
The directive accepts a parameter that you need to change if you want to trigger the rerender.  
In my example I'm going to use a  number with increment, but you can also use any data you want that triggers a regular Angular change detection.
```typescript
class MyComponent {
  public trigger: number = 0;

  public rerender(): void {
    this.trigger++;
  }
}
```
````html
<stuff-to-rerender *mcRerender="trigger">Some Content</stuff-to-rerender>
````
Every time the `rerender` method is called the component that has the directive attached to it will be rerendered.

Keep in mind changing entries inside an array will not trigger an Angular change detection. If you use an array as trigger binding,
you need to copy the array in order to get a new reference.

### With component
If you prefer using a component in your template you can do the following approach. The TypeScript part can stay exactly the same.  
However, if you like you can use a boolean flag and a two-way binding and the component will always change the value back to false.
This way you don't need to have a number as trigger, but you can use a boolean value
```typescript
class MyComponent {
  public trigger: boolean = false;

  public rerender(): void {
    this.trigger = true;
  }
}
```
```html
<mc-rerender [(trigger)]="trigger">
  <ng-template mcRerenderContent>
    <stuff-to-rerender *mcRerender="trigger">Some Content</stuff-to-rerender>
  </ng-template>
</mc-rerender>
```
The important part in the component way is the additional `<ng-template mcRerenderContent>` wrapper around your content.  
Do not change this, otherwise it will not work properly.

## Why
Angular has a very robust change detection and is usually fully capable of dynamically updating components and bindings without the need to re-render entire code blocks. 
If you are not familiar with the basics of change detection or are just starting learning Angular, I highly recommend checking out their [Documentation](https://angular.io/guide/lifecycle-hooks#lifecycle-event-sequence),
because chances are that you don't even need this library.

Sometimes, especially when using 3rd-party-libraries and components, the Angular change detection is not enough. For example if no `ngOnChanges` handling is implemented so specific bindings can only be set during `ngOnInit`.  
For those cases you can use this library to just re-render (and re-initialize) entire component trees.

### Past workarounds
In this small section I will show some workarounds that I've seen in the past on StackOverflow or other projects and try to explain why they are not a good idea.

#### The ngIf "Have you tried turning it off and on again?"
The idea is to completely remove the specific component from the DOM, manually trigger a change detection and then re-add it. A basic solution looks something like this

```typescript
import { ChangeDetectorRef } from '@angular/core';

class MyComponent {
  public isVisible: boolean = true;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  
  public rerender(): void {
    this.isVisible = false;
    this.changeDetectorRef.detectChanges();
    this.isVisible = true;
  }
}
```
````html
<stuff-to-rerender *ngIf="isVisible">Some Content</stuff-to-rerender>
````

This is a very "straight forward" and often suggested solution. However, it's not ideal for two reasons. First you will notice a "blink" in your page, because there is one entire lifecycle where your component is not visible.  
And secondly you trigger a change detection for the entire application. Every other binding and lifecycle hook gets also triggered. This can become an issue in big applications where the `ChangeDetectionStrategy.OnPush` is not being used.

#### The ngFor "smart" workaround
The idea is to "trick" Angular into thinking my current element is actually a new one. For this we make use of `ngFor` which will initialize each entry from scratch once and then only update bindings based on the reference in the array.  
If we update the reference in the array it will effectively re-rerender the given code part.
```typescript
class MyComponent {
  public rerenderProps: Array<number> = [1];
  
  public rerender(): void {
      this.rerenderProps[0]++;
  }
}
```
````html
<div *ngFor="let i of rerenderProps">
    <stuff-to-rerender>Some Content</stuff-to-rerender>
</div>
````

While this solves the two issues of the `ngIf` workaround (content blink and app-wide change detection) this is still not a nice solution.  
It is very hard to understand for others looking at your code, and also you always need to implement additional logic like index checks `ngIf="index === 0"` in order to prevent accidentally showing the component multiple times.

## How
I explained the basics in a detailed [Blog Post](https://developapa.com/add-my-link-here)

## FAQ

### I'm using one of the workarounds (or some other workaround), does it make sense to start using this library?
Yes! While the workarounds all work to some extent they never feel nice to use and always cause confusion for other devs verifying your code.

### I found a bug/scenario where it is not working, what shall I do?
Please create an issue with a Stackblitz reproduction and I'm sure we will find a solution

### I don't need this why should I use it?
If you don't need it I'm really happy for your. Like I said nearly all my problems where I reach for this library myself are when dealing with 3rd party libraries.

### Why are there two different ways of achieving the same thing with this library?
The two ways are not entirely the same. The component approach allows you to use a boolean flag that automatically gets changed back to false - this feels very nice to use. 
But in contrast the directive way has a smaller code footprint in your html template.  
Ultimately it allows you to choose a way that fits your personal style and needs the best.

### I'm using a boolean value and the directive way but the content is not being rerendered?
If you are using the directive way you have to use a value that will be picked up by the Angular change detection. 
If you use a boolean value and change this to `true` it just will stay true. For this to work you need to set it back to false by yourself 
(It is sadly not possible for directives to update their binding value)

## License
This project is licensed under the MIT license. See the LICENSE file for more info.
