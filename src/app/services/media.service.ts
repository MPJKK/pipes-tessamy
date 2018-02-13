import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Login} from '../models/login';

@Injectable()
export class MediaService {

  apiUrl = 'http://media.mw.metropolia.fi/wbma';
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  logged = false;

  constructor(private http: HttpClient, private router: Router) {
  }

  getAllMedia() {
    return this.http.get(this.apiUrl + '/media');
  }

  getNew(){
    return this.http.get(this.apiUrl + '/media?limit=10');
  }

  newUser(user) {
    return this.http.post(this.apiUrl + '/users', user);
  }

  login(user) {
    this.http.post<Login>(this.apiUrl + '/login', user).subscribe(response => {
      // homma ok -> fronttiin
      console.log(response);
      localStorage.setItem('token', response.token);
      this.router.navigate(['front']);
    }, (error: HttpErrorResponse) => {
      // homma kusee -> loginiin
      console.log(error);
      this.router.navigate(['login']);
    });

  }

  getUserData(token) {
    const options = {
      headers: new HttpHeaders().set('x-access-token', token),
    };
    return this.http.get(this.apiUrl + '/users/user', options);

  }

  uploadMedia(token, formData) {
    const options = {
      headers: new HttpHeaders().set('x-access-token', token),
    };
    return this.http.post(this.apiUrl + '/media', formData, options);
  }
}
