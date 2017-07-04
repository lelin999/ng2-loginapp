import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()

export class ApiService {
	headers: Headers = new Headers({
    'Content-type': 'application/json',
    Accept: 'application/json'
  });

  api_url = 'localhost:3000';

  constructor(
  	private http: Http
  ) {} 

  getJson(resp) {
    return resp.json();
  }

  checkForError(resp) {
    if (resp.status >= 200 && resp.status < 300) {
      return resp;
    } else {
      const error = new Error(resp.statusText);
      error['response'] = resp;
      console.error(error);
      throw error;
    }
  }

  post(path: string, data: any): Observable<any> {
    return this.http.post(`${this.api_url}${path}`, JSON.stringify(data), {headers: this.headers})
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJson)
  }

  setHeaders(headers) {
    Object.keys(headers)
      .forEach(header => this.headers.set(header, headers[header]));
  }
  
};