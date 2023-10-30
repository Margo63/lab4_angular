import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="display: flex; flex-direction: row">
      <div (click)="onSignInButtonCLick()" style="background-color: #FF4B3A">Sign In</div>
      <div (click)="onSignUpButtonClick()" style="background-color: #FF4B3A">Sign Up</div>
    </div>

    <register-form [ngStyle]="{'display': registerDisplay} "> </register-form>
    <login-form [ngStyle]="{'display': loginDisplay}"></login-form>

    `,
  styles:[`
    register-form, login-form{
      background-color: #FF4B3A;
      font-size: 30px;
      color: #FFFFFF;
      border-radius: 10px;
      margin-right: 10px;
      margin-left: 10px;
      padding: 10px;
    }
    div{
      color: #FFFFFF;
      font-size: 30px;
      border-radius: 10px;
      padding: 10px;
      margin-right: 10px;
      margin-top: 10px;
    }

  `]
})
export class registerComponent {
  registerDisplay = "block"
  loginDisplay = "none"


  onSignInButtonCLick() {
    this.registerDisplay = "none"
    this.loginDisplay = "block"
  }

  onSignUpButtonClick() {
    this.registerDisplay = "block"
    this.loginDisplay = "none"
  }


}
