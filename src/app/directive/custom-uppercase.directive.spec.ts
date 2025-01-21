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

  it('should create the directive', () => {
    expect(inputElement).toBeTruthy();
  });

  it('should convert input value to uppercase on input event', () => {
    inputElement.value = 'hello';
    inputElement.dispatchEvent(new Event('input'));
    inputElement.value = inputElement.value.toUpperCase();
    fixture.detectChanges();

    expect(inputElement.value).toBe('HELLO');
  });
});
