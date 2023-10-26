import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="onSignInButtonCLick()">Sign In</button>
    <button (click)="onSignUpButtonClick()">Sign Up</button>
    <register-form [ngStyle]="{'display': registerDisplay}"> </register-form>
    <login-form [ngStyle]="{'display': loginDisplay}"></login-form>
    `,
  styles:[``]
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
