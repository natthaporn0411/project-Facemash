import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../service/login.service';
import { user } from '../model/model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatToolbarModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) {}
  userlogin : user[] = [];

  async loginuser(username: string, password: string,event: Event) {
    event.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      alert("Username or password is not provided.");
      return;
    }else{
       this.userlogin = await this.loginService.LoginUser(username, password);
    if(this.userlogin.length > 0 ){
        localStorage.setItem('user', JSON.stringify(this.userlogin));
        this.router.navigate(['']);
    }else{
      alert("Loging failed.");
      }
    }
  }
  
 
}