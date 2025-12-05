import { Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-input',
  imports: [SharedModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  standalone: true, 
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() inputControl?: FormControl;
  @Input() labelTitle = '';
  @Input() placeholder = '';
  @Input() value: any;
  @Input() inputValue: any;
  @Input() type = 'text';
  @Input() disabled = false;
  @Input() isFlexed = false;
  @Input() customClass = '';
  @Input() withNgModel = false;
  @Input() min?: number;
  @Input() maxValue?: number;
  @Output() actionEvent = new EventEmitter<boolean>();

  valueInternal: any = '';

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.valueInternal = this.value ?? this.inputValue ?? '';
  }

  writeValue(obj: any): void {
    this.valueInternal = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.valueInternal = target.value;
    this.onChange(this.valueInternal);
    this.onTouched();
    this.actionEvent.emit(true);
  }
}