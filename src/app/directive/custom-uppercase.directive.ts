import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[customUppercase]',
  standalone: false
})
export class CustomUppercaseDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    input.value = input.value.toUpperCase(); 
  }

}
