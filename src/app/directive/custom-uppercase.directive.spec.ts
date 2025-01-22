import { CustomUppercaseDirective } from './custom-uppercase.directive';
import { ElementRef, Directive, HostListener } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  template: `<input type="text" customUppercase />`
})
class TestComponent {}

describe('CustomUppercaseDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    inputElement = fixture.nativeElement.querySelector('input');
  });

  it('Debe crear la directiva', () => {
    expect(inputElement).toBeTruthy();
  });

  it('Debe convertir el valor del input a uppercase cuando se ejecuta el evento del input', () => {
    inputElement.value = 'hello';
    inputElement.dispatchEvent(new Event('input'));
    inputElement.value = inputElement.value.toUpperCase();
    fixture.detectChanges();

    expect(inputElement.value).toBe('HELLO');
  });
});
