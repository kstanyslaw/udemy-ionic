import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

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
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  onLogin() {
    this.authService.login();
    this.isLoading = true;
    this.loadingController.create({ keyboardClose: true, message: 'Loggin in...' }).then(loadingEl => {
      loadingEl.present();
      setTimeout(() => {
        loadingEl.dismiss();
        this.isLoading = false;
        this.router.navigate(['/', 'places', 'tabs', 'discover']);
      }, 1500);
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    if (this.isLogin) {
      
    } else {
      
    }
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

}
