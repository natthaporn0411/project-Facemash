import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-userinfo',
  standalone: true,
  imports: [ CommonModule, MatToolbarModule],
  templateUrl: './userinfo.component.html',
  styleUrl: './userinfo.component.scss'
})
export class UserinfoComponent {

}
