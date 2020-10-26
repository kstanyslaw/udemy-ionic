import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthResponceData, AuthService } from './auth.service';
import { User } from './user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  private authenticate(authObs: Observable<AuthResponceData>) {
    this.isLoading = true;
    this.loadingController
      .create({ keyboardClose: true, message: 'Loggin in...' })
      .then(loadingEl => {

        loadingEl.present();
        authObs.subscribe(
          resData => {
            loadingEl.dismiss();
            this.isLoading = false;
            this.router.navigate(['/', 'places', 'tabs', 'discover']);
          },
          errorRes => {
            loadingEl.dismiss();
            this.isLoading = false;

            const code = errorRes.error.error.message;
            switch (code) {
              case 'EMAIL_EXISTS':
                this.showAlert('The email address is already in use by another account.');
                break;

              case 'OPERATION_NOT_ALLOWED':
                this.showAlert('Password sign-in is disabled for this project.');
                break;

              case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                this.showAlert('We have blocked all requests from this device due to unusual activity. Try again later.');
                break;

              case 'EMAIL_NOT_FOUND':
                this.showAlert('There is no user record corresponding to this identifier. The user may have been deleted.');
                break;

              case 'INVALID_PASSWORD':
                this.showAlert('The password is invalid or the user does not have a password.');
                break;

              case 'USER_DISABLED':
                this.showAlert('The user account has been disabled by an administrator.');
                break;
            
              default:
                this.showAlert('Could not sign you up, please try again.');
                break;
            }
          }
        );
      });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponceData>;
    if (this.isLogin) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }
    this.authenticate(authObs);
  }

  private async showAlert(message: string) {
    const alertEl = await this.alertController.create({
      header: 'Authentication failed',
      message: message,
      buttons: ['OK']
    });
    await alertEl.present();
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

}
