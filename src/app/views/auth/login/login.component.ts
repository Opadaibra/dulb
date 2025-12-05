import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../shared/input/input.component';

@Component({
  selector: 'app-login',
  imports: [InputComponent , FormsModule, ReactiveFormsModule],
  standalone: true, 
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup | any;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
      alert(`Welcome ${this.loginForm.value.username}!`);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
