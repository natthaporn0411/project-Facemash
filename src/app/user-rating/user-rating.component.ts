import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Getimgservice } from '../service/getimg.service';
import { GetImg } from '../model/img';
import { RatingToday } from '../model/rating';

@Component({
  selector: 'app-user-rating',
  standalone: true,
  imports: [ CommonModule, MatToolbarModule, RouterModule],
  templateUrl: './user-rating.component.html',
  styleUrl: './user-rating.component.scss'
})
export class UserRatingComponent implements OnInit{
  ratingToday: RatingToday[] = [];

  constructor(private getimgservice: Getimgservice) { }

  ngOnInit(): void {
    
  }

  

}
