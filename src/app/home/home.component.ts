import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule,Router} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { GetImg } from '../model/img';
import { Getimgservice } from '../service/getimg.service';
import { user } from '../model/model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule,RouterModule,CommonModule,MatCardModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router , private getimg : Getimgservice) {}
  allimg : GetImg[] = [];
  selectedImages: GetImg[] = [];
  votedImages: GetImg[] = [];
  imgwinner : GetImg[] = [];
  imgloser : GetImg[] = [];
  votedImagesIds: Set<number> = new Set<number>();
  totalImages: number = 0;
  votedImagesCount: number = 0;
  countdownSeconds: number = 0;
  show : boolean = true;
  User : user[] = [];
  ngOnInit():void {
    this.loadImg();
    if (localStorage.getItem('user')) {
      this.User = JSON.parse(localStorage.getItem('user')!);
      console.log(this.User);
    }
  }

  async loadImg(){
    this.allimg = this.shuffleImages(await this.getimg.Getimg());
    this.totalImages = this.allimg.length;
    this.loadNextImages();
    this.show = true;
  }

  loadNextImages() {
    const remainingImages = this.allimg.filter(img => !this.votedImagesIds.has(img.picture_id));
  
    if (remainingImages.length >= 2) {
      this.selectedImages = this.shuffleImages(remainingImages.slice(0, 2));
    } else {
      this.loadImg();
    }
  }

  shuffleImages(images: GetImg[]) {
    let currentIndex = images.length;
    let randomIndex: number;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [images[currentIndex], images[randomIndex]] = [images[randomIndex], images[currentIndex]];
    }

    return images;
  }
  onImageClick(winnerIndex: number) { 
    const winnerImage = this.selectedImages[winnerIndex]; 
    const loserIndex = winnerIndex === 0 ? 1 : 0;
    const loserImage = this.selectedImages[loserIndex];

    if (this.votedImagesIds.has(winnerImage.picture_id) || this.votedImagesIds.has(loserImage.picture_id)) {
      alert('ไม่สามารถโหวตรูปเดิมได้');
      return;
    }
    this.imgwinner.pop();
    this.imgloser.pop();
    winnerImage.isWinner = true;
    loserImage.isLoser = false;

    const expectedWinnerProbability = this.getExpectedScore(winnerImage.point, loserImage.point);
    const expectedLoserProbability = this.getExpectedScore(loserImage.point, winnerImage.point);
    this.updateElo(winnerImage, loserImage, expectedWinnerProbability,expectedLoserProbability);

    this.votedImagesIds.add(winnerImage.picture_id);
    this.votedImagesIds.add(loserImage.picture_id);
    this.votedImagesCount += 2;

    if (this.votedImagesCount === this.totalImages) {
      console.log('โหวตครบทุกรูปแล้ว');
      this.show = false;
      this.countdownSeconds = 5; // กำหนดเวลานับถอยหลังให้เริ่มต้นที่ 5 วินาที
      const intervalId = setInterval(() => {
        this.countdownSeconds--;
  
        if (this.countdownSeconds < 0) {
          clearInterval(intervalId);
          console.log('นับถอยหลังเสร็จสิ้น');
          this.votedImagesCount = 0;
          this.votedImagesIds.clear();
          this.loadImg();
        }
      }, 1000); // นับถอยหลังทุก 1000 มิลลิวินาที (1 วินาที)
      return;
    } else {
      this.loadNextImages();
    }

  }
  calculateKFactor(rating: number) {
    if (rating >= 0 && rating <= 600) {
      return 25;
    } else if (rating >= 601 && rating <= 2400) {
      return 15;
    } else if (rating >= 2401 && rating <= 3000) {
      return 10;
    } else if (rating > 3000) {
      return 5;
    } else {
      return 32; 
    }
  }

  getExpectedScore(ratingA: number, ratingB: number) {
    return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
  }

  async updateElo(winner: GetImg, loser: GetImg, expectedwinProbability: number,expectedLoserProbability : number) {
    const actualWinnerProbability = 1; // ผลการโหวตจริง (คือชนะ)
    const actualLoserProbability = 0; // ผลการโหวตจริง (คือชนะ)
    const kFactorWinner = this.calculateKFactor(winner.point); // นำเข้าค่า K Factor ตามคะแนนปัจจุบันของ winner
    const kFactorLoser = this.calculateKFactor(loser.point); // นำเข้าค่า K Factor ตามคะแนนปัจจุบันของ loser
  
    // คำนวณคะแนนใหม่สำหรับ winner และ loser
    const winnerNewRating = Math.round(kFactorWinner * (actualWinnerProbability - expectedwinProbability));
    const loserNewRating = Math.round(kFactorLoser * (actualLoserProbability - expectedLoserProbability));
    console.log("winnerNewRating : "+winnerNewRating);
    console.log("loserNewRating : "+loserNewRating);        

    this.imgwinner.push(winner);
    this.imgloser.push(loser);
    console.log(this.imgwinner);
    console.log(this.imgloser);
    console.log(winner);
    console.log(loser);
    console.log(winner.uid);
    
    
        winner.point = winnerNewRating + winner.point;
        loser.point = loserNewRating + loser.point;
        console.log(winner.point);
        console.log(loser.point);
       
        
    const checkwinner = await this.getimg.InsertVote(winner.uid,winner.picture_id,winnerNewRating,winner.isWinner);
    const checkloser  = await this.getimg.InsertVote(loser.uid,loser.picture_id,loserNewRating,loser.isLoser);

    if(checkwinner === true && checkloser === true){
      await this.getimg.Updateimg(winner.picture_id,winner.point);
      await this.getimg.Updateimg(loser.picture_id,loser.point);
    }
  }
}