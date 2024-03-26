import { Component, ElementRef, ViewChild ,AfterViewInit ,OnInit } from '@angular/core';
import { Chart ,registerables} from 'chart.js';
import { Getimgservice } from '../service/getimg.service';
import { Router } from '@angular/router';
import { Vote } from '../model/rating';
import { HeaderComponent } from "../header/header.component";
import { CommonModule ,formatDate} from '@angular/common';


@Component({
    selector: 'app-graph',
    standalone: true,
    templateUrl: './graph.component.html',
    styleUrl: './graph.component.scss',
    imports: [HeaderComponent,CommonModule,]
})

export class GraphComponent {
  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef;

  getimg: Vote[] = [];
  isLoading: boolean = true;
  charts:Chart[]=[];
  constructor(private getimgservice: Getimgservice ,private router: Router) {Chart.register(...registerables)}

  ngOnInit(): void {
    this.loadData();
    // this.chartCanvas.nativeElement;
  }

  async loadData(): Promise<void> {
    try {
      const user = JSON.parse(localStorage.getItem('user')!);
      if (user) {
        this.getimg = await this.getimgservice.Graph(user[0].uid);
        console.log('getimg:', this.getimg);
        this.ngAfterViewInit();
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      this.isLoading = false; // Set loading state to false when data loading is complete
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.getimg && this.getimg.length > 0) {
        this.createCharts();
      }
    }, 0);
  }

  createCharts(): void {
    for (const img of this.getimg) {
      const id = `myChart${img.picture_id}`;
      const existingCanvas = document.getElementById(id) as HTMLCanvasElement;
     
      
      if (!existingCanvas) {
        console.error(`Canvas element with id '${id}' not found.`);
        continue; // Skip to the next iteration if canvas element is not found
      }
      const currentDate = new Date();
      const sevenDaysAgo = new Date(currentDate);
      sevenDaysAgo.setDate(currentDate.getDate() - 6);

      const voteDateArray = img.date.split(',');
      const totalScoreArray = img.point.split(',').map(Number);
  console.log(totalScoreArray);
  
      // const labels = this.generateDateLabels(sevenDaysAgo);
      const data = totalScoreArray;
      const labels = voteDateArray;
      // const data = this.generateDataArray(voteDateArray, totalScoreArray, sevenDaysAgo);
  
      new Chart(existingCanvas, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'คะแนนในแต่ละวัน',
              data: data,
              borderWidth: 2,
              pointRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            title: {
              display: true,
            },
          },
        },
      });
    }
  }
}