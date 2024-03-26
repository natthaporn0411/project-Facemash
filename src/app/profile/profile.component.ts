import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from "../header/header.component";
import { user } from '../model/model';
import { Getimgservice } from '../service/getimg.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Uploads } from '../model/Uploads';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [MatToolbarModule, HeaderComponent, CommonModule, RouterModule]
})
export class ProfileComponent implements OnInit {
  User: user[] = [];
  getimg: Uploads[] = [];
  isLoading: boolean = true;
  showAddButton: boolean = false;

  constructor(private getimgservice: Getimgservice, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(): Promise<void> {
    try {
      const user = JSON.parse(localStorage.getItem('user')!);
      if (user) {
        this.User = user;
        this.getimg = await this.getimgservice.GetimgByid(this.User[0].uid);
        console.log('getimg:', this.getimg);
        this.showAddButton = this.getimg.length < 5;
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      this.isLoading = false;
    }
  }

  addImage() {
    // Implement the logic for adding a new image
    console.log('Add image button clicked');
  }
}
