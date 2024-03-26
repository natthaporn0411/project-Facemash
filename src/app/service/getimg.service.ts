import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { GetImg } from '../model/img';
import { Constants } from '../config/constans';
import { RatingToday, Vote } from '../model/rating';
import { Uploads } from '../model/Uploads';
@Injectable({
  providedIn: 'root',
})
export class Getimgservice {
  GetGraph(uid: any): Vote[] | PromiseLike<Vote[]> {
    throw new Error('Method not implemented.');
  }
  constructor(private constants: Constants, private http: HttpClient) {}
  public async Getimg() {
    const url = this.constants.API_ENDPOINT + '/picture';
    const response = await lastValueFrom(this.http.get(url));
    return response as GetImg[];
  }
  public async GetimgByid(id:number) {
    const url = this.constants.API_ENDPOINT + '/picture/'+id;
    const response = await lastValueFrom(this.http.get(url));
    return response as GetImg[];
  }

  public async InsertVote(
    uid: number,
    picture_id: number,
    point: number,
    isWinner: boolean
  ) {
    const url = this.constants.API_ENDPOINT + '/vote/insertimg';
    const body = {
      uid: uid,
      picture_id: picture_id,
      point: point,
      isWinner: isWinner,
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    try {
      const response = await this.http
        .post(url, body, { headers: headers })
        .toPromise();
      return true;
    } catch (error) {
      throw error;
    }
  }
  public async Updateimg(picture_id: number, point: number) {
    const url = this.constants.API_ENDPOINT + '/picture/update/' + picture_id;
    const body = {
      point: point,
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    try {
      const response = await this.http
        .put(url, body, { headers: headers })
        .toPromise();
      return true;
    } catch (error) {
      throw error;
    }
  }

  public async RatingToday() {
    const url = this.constants.API_ENDPOINT + '/rating/today';
    const response = await lastValueFrom(this.http.get(url));
    return response as RatingToday[];
  }
  public async RatingYesterday() {
    const url = this.constants.API_ENDPOINT + '/rating/yesterday';
    const response = await lastValueFrom(this.http.get(url));
    return response as RatingToday[];
  }
  public async Graph(uid:number) {
    const url = this.constants.API_ENDPOINT + '/rating/graph/'+uid;
    const body = {
      uid: uid,
    };
    const response = await lastValueFrom(this.http.get(url));
    return response as Vote[];
  }
   public async Topten() {
    const url = this.constants.API_ENDPOINT + '/rating';
    const response = await lastValueFrom(this.http.get(url));
    return response as RatingToday[];
  }
  public async Uploads(){
    const url = this.constants.API_ENDPOINT+'/uploads'
    const response = await lastValueFrom(this.http.get(url));
    return response as Uploads[];

  }
}