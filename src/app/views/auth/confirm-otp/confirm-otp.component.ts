import { Component } from '@angular/core';
import { NgIf } from "../../../../../node_modules/@angular/common/common_module.d-NEF7UaHr";
import { PermissionDirective } from "../../../core/directives/permission.directive";

@Component({
  selector: 'app-confirm-otp',
  imports: [NgIf, PermissionDirective],
  templateUrl: './confirm-otp.component.html',
  styleUrl: './confirm-otp.component.scss'
})
export class ConfirmOtpComponent {

}
