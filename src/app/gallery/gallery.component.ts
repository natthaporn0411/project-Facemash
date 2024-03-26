import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { ToptenComponent } from '../topten/topten.component';
import { ProfileComponent } from '../profile/profile.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [ CommonModule, HomeComponent, ToptenComponent, ProfileComponent, RouterModule, MatToolbarModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {

}
