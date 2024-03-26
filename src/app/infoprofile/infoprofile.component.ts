import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-infoprofile',
  standalone: true,
  imports: [ CommonModule, RouterModule, MatToolbarModule],
  templateUrl: './infoprofile.component.html',
  styleUrl: './infoprofile.component.scss'
})
export class InfoprofileComponent {

}
