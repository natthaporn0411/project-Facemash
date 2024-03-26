import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { Getimgservice } from '../service/getimg.service';
import { RatingToday } from '../model/rating';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-topten',
  standalone: true,
  imports: [ MatToolbarModule, RouterModule, HomeComponent, CommonModule, HeaderComponent],
  templateUrl: './topten.component.html',
  styleUrl: './topten.component.scss'
})
export class ToptenComponent implements OnInit {
  topTenList: RatingToday[] = [];

  constructor(private getimgService: Getimgservice) { }

  async ngOnInit(): Promise<void> {
    await this.getTopTen(); // เรียกเมื่อ component โหลด
  }

  async getTopTen(): Promise<void> {
    try {
      this.topTenList = await this.getimgService.RatingToday();
    } catch (error) {
      console.error(error);
    }
  }
}
