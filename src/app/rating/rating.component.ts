import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Getimgservice } from '../service/getimg.service';
import { RatingToday } from '../model/rating';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [ CommonModule, RouterModule, HomeComponent, MatToolbarModule, HeaderComponent],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent implements OnInit {
  ratingToday: RatingToday[] = [];
  ratingYesterday: RatingToday[] = [];
  differentEntries: any = {};

  constructor(private getimgservice: Getimgservice) {}

  ngOnInit(): void {
    this.getRatingToday();
    // this.getRatingYesterday();
  }

  getRatingToday() {
    this.getimgservice.RatingToday().then(data => {
      this.ratingToday = data;
      console.log(this.ratingToday);

      // this.calculateDifference();
    }).catch(error => {
      console.error(error);
    });
  }

  // getRatingYesterday() {
  //   this.getimgservice.RatingYesterday().then(data => {
  //     this.ratingYesterday = data;
  //     console.log(this.ratingYesterday);

  //     this.calculateDifference();
  //   }).catch(error => {
  //     console.error(error);
  //   });
  // }

  // calculateDifference() {
  //   if (this.ratingToday.length > 0 && this.ratingYesterday.length > 0) {
  //     this.differentEntries = this.getimgservice.findDifferentEntries(this.ratingToday, this.ratingYesterday);
  //     console.log('Rating difference:', this.differentEntries);
  //   }
  // }
}
