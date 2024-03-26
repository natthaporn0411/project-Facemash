import { Injectable } from '@angular/core';
import { Constants } from '../config/constans';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { user } from '../model/model';
import { lastValueFrom } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
  export class LoginService {


    constructor(private constants : Constants , private http : HttpClient){}
    public async LoginUser(username: string, password: string) {
      const url = this.constants.API_ENDPOINT + "/login/" + username + "/" + password;
      const response = await lastValueFrom(this.http.get(url));
      return response as user[];
    }
    public async GetloginUser(uid: number) {
      const url = this.constants.API_ENDPOINT + "/login/" + uid;
      const response = await lastValueFrom(this.http.get(url));
      return response as user[];
    }

    public async SignupUser(name: string, username: string, password: string) {
      const url = this.constants.API_ENDPOINT + '/login/signup';
      const body = {
        username: username,
        name: name,
        password: password,
      };
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      try {
        const response = await this.http.post(url, body, { headers: headers }).toPromise();
        console.log(response);
        return response ;
      } catch (error) {
        throw error;
      }
    }
}