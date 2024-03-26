import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { user } from '../model/model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterModule, CommonModule, HomeComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  constructor(private router: Router) {}
  User : user[] = [];

  ngOnInit():void {
    if (localStorage.getItem('user')) {
      this.User = JSON.parse(localStorage.getItem('user')!);
      console.log(this.User);
    }
  }
  Logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  profile(){
    this.router.navigate(['/profile']);
  }
}